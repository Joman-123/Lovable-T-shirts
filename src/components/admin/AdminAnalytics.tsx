import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export function AdminAnalytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const [productsRes, ordersRes, customDesignsRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount'),
        supabase.from('custom_designs').select('*', { count: 'exact', head: true })
      ]);

      const totalRevenue = ordersRes.data?.reduce((sum, order) => 
        sum + parseFloat(order.total_amount.toString()), 0) || 0;

      return {
        totalProducts: productsRes.count || 0,
        totalOrders: ordersRes.data?.length || 0,
        totalRevenue,
        customDesigns: customDesignsRes.count || 0
      };
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      title: 'إجمالي المنتجات',
      value: analytics?.totalProducts || 0,
      icon: Package,
      color: 'text-blue-500'
    },
    {
      title: 'إجمالي الطلبات',
      value: analytics?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-green-500'
    },
    {
      title: 'الإيرادات',
      value: `$${analytics?.totalRevenue.toFixed(2) || '0.00'}`,
      icon: DollarSign,
      color: 'text-yellow-500'
    },
    {
      title: 'طلبات التصاميم المخصصة',
      value: analytics?.customDesigns || 0,
      icon: Users,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">التحليلات والإحصائيات</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            مرحباً بك في لوحة التحكم الإدارية. من هنا يمكنك إدارة جميع جوانب متجرك الإلكتروني:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>إضافة وتعديل المنتجات</li>
            <li>متابعة الطلبات وتحديث حالاتها</li>
            <li>مراجعة طلبات التصاميم المخصصة</li>
            <li>مراقبة الإيرادات والمبيعات</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
