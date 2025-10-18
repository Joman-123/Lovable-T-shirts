import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminOrders } from '@/components/admin/AdminOrders';
import { AdminCustomDesigns } from '@/components/admin/AdminCustomDesigns';
import { AdminAnalytics } from '@/components/admin/AdminAnalytics';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { Loader2, Settings } from 'lucide-react';

export default function Admin() {
  const { isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/auth');
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5" dir="rtl">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          لوحة التحكم الإدارية
        </h1>
        
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto bg-card/50 p-1">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="custom-designs" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              التصاميم المخصصة
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
              <Settings className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="orders">
            <AdminOrders />
          </TabsContent>
          
          <TabsContent value="custom-designs">
            <AdminCustomDesigns />
          </TabsContent>
          
          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
