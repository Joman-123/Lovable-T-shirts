import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export function AdminOrders() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            product_title,
            variant_info,
            quantity,
            unit_price,
            total_price
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      toast.success('تم تحديث حالة الطلب بنجاح');
    },
    onError: (error: any) => {
      toast.error('خطأ في تحديث حالة الطلب', { description: error.message });
    }
  });

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      pending: 'bg-yellow-500',
      processing: 'bg-blue-500',
      shipped: 'bg-purple-500',
      delivered: 'bg-green-500',
      cancelled: 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: OrderStatus) => {
    const labels: Record<OrderStatus, string> = {
      pending: 'قيد الانتظار',
      processing: 'قيد المعالجة',
      shipped: 'تم الشحن',
      delivered: 'تم التسليم',
      cancelled: 'ملغي'
    };
    return labels[status] || status;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">إدارة الطلبات</h2>

      <div className="space-y-4">
        {orders?.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">طلب #{order.id.slice(0, 8)}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(order.created_at), 'PPP - p', { locale: ar })}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusLabel(order.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p><strong>اسم العميل:</strong> {order.customer_name}</p>
                  <p><strong>البريد:</strong> {order.customer_email}</p>
                  <p><strong>الهاتف:</strong> {order.customer_phone}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>العنوان:</strong> {order.shipping_address}</p>
                  <p><strong>المدينة:</strong> {order.shipping_city}</p>
                  <p><strong>الدولة:</strong> {order.shipping_country}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">المنتجات:</h4>
                <div className="space-y-1">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.product_title} {item.variant_info && `(${item.variant_info})`} x{item.quantity}
                      </span>
                      <span>{item.total_price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>المجموع:</span>
                  <span>{order.total_amount}</span>
                </div>
              </div>

              {order.notes && (
                <div className="space-y-2">
                  <h4 className="font-semibold">ملاحظات:</h4>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Select
                  value={order.status}
                  onValueChange={(value: OrderStatus) => updateStatusMutation.mutate({ id: order.id, status: value })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">قيد الانتظار</SelectItem>
                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                    <SelectItem value="shipped">تم الشحن</SelectItem>
                    <SelectItem value="delivered">تم التسليم</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            لا توجد طلبات حالياً
          </CardContent>
        </Card>
      )}
    </div>
  );
}
