import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';

export function AdminProducts() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'summer' as 'summer' | 'winter' | 'custom',
    image_url: '',
    stock_quantity: '0',
    is_active: true
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('products').insert(data);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('تم إضافة المنتج بنجاح');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error('خطأ في إضافة المنتج', { description: error.message });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from('products')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('تم تحديث المنتج بنجاح');
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error('خطأ في تحديث المنتج', { description: error.message });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('تم حذف المنتج بنجاح');
    },
    onError: (error: any) => {
      toast.error('خطأ في حذف المنتج', { description: error.message });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      category: 'summer',
      image_url: '',
      stock_quantity: '0',
      is_active: true
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock_quantity: parseInt(formData.stock_quantity)
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createMutation.mutate(productData);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url || '',
      stock_quantity: product.stock_quantity.toString(),
      is_active: product.is_active
    });
    setIsDialogOpen(true);
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة منتج جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">اسم المنتج *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">السعر *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stock">الكمية المتوفرة *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">التصنيف *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">صيفي</SelectItem>
                    <SelectItem value="winter">شتوي</SelectItem>
                    <SelectItem value="custom">مخصص</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">رابط الصورة</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="flex-1"
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                  {editingProduct ? 'تحديث' : 'إضافة'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-md"
                />
              )}
              <div className="space-y-2 text-sm">
                <p><strong>السعر:</strong> ${product.price}</p>
                <p><strong>الكمية:</strong> {product.stock_quantity}</p>
                <p><strong>التصنيف:</strong> {product.category === 'summer' ? 'صيفي' : product.category === 'winter' ? 'شتوي' : 'مخصص'}</p>
                <p><strong>الحالة:</strong> {product.is_active ? 'نشط' : 'غير نشط'}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                  className="flex-1"
                >
                  <Edit className="ml-1 h-4 w-4" />
                  تعديل
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1"
                >
                  <Trash2 className="ml-1 h-4 w-4" />
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {products?.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            لا توجد منتجات حالياً. قم بإضافة منتج جديد للبدء.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
