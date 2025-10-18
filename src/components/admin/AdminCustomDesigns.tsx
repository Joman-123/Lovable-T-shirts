import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export function AdminCustomDesigns() {
  const queryClient = useQueryClient();

  const { data: designs, isLoading } = useQuery({
    queryKey: ['admin-custom-designs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('custom_designs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('custom_designs')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-custom-designs'] });
      toast.success('تم تحديث حالة الطلب بنجاح');
    },
    onError: (error: unknown) => {
      const description = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      toast.error('خطأ في تحديث حالة الطلب', { description });
    }
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      approved: 'bg-green-500',
      rejected: 'bg-red-500',
      completed: 'bg-blue-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: 'قيد المراجعة',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      completed: 'مكتمل'
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
      <h2 className="text-2xl font-bold">طلبات التصاميم المخصصة</h2>

      <div className="space-y-4">
        {designs?.map((design) => (
          <Card key={design.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">طلب #{design.id.slice(0, 8)}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(design.created_at), 'PPP - p', { locale: ar })}
                  </p>
                </div>
                <Badge className={getStatusColor(design.status)}>
                  {getStatusLabel(design.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p><strong>اسم العميل:</strong> {design.customer_name}</p>
                  <p><strong>البريد:</strong> {design.customer_email}</p>
                  <p><strong>الهاتف:</strong> {design.customer_phone}</p>
                  <p><strong>الكمية:</strong> {design.quantity}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {design.estimated_price && (
                    <p><strong>السعر المقدر:</strong> ${design.estimated_price}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">وصف التصميم:</h4>
                <p className="text-sm text-muted-foreground">{design.design_description}</p>
              </div>

              {design.notes && (
                <div className="space-y-2">
                  <h4 className="font-semibold">ملاحظات:</h4>
                  <p className="text-sm text-muted-foreground">{design.notes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Select
                  value={design.status}
                  onValueChange={(value) => updateStatusMutation.mutate({ id: design.id, status: value })}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="approved">موافق عليه</SelectItem>
                    <SelectItem value="rejected">مرفوض</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {designs?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            لا توجد طلبات تصاميم مخصصة حالياً
          </CardContent>
        </Card>
      )}
    </div>
  );
}
