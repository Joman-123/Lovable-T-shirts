import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore, type Product } from "@/stores/cartStore";
import { ShoppingCart, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Products = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('فشل تحميل المنتجات');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      product,
      variantId: product.id,
      quantity: 1,
    });
    toast.success('تم الإضافة للسلة!', {
      description: product.title,
      position: 'top-center',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-secondary text-background px-6 py-2">
            <Star className="h-4 w-4 ml-2 inline" />
            منتجات مميزة
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              {t('products.title')}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف مجموعتنا المميزة من القمصان عالية الجودة
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div 
                key={i} 
                className="h-[450px] bg-card rounded-2xl border border-primary/10 overflow-hidden"
              >
                <div className="h-full animate-shimmer"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="mb-6">
              <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto opacity-20" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-foreground">لا توجد منتجات حالياً</h3>
            <p className="text-muted-foreground mb-6">سنضيف منتجات جديدة قريباً!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group animate-fade-in-scale hover-lift card-glow"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
                    {product.stock_quantity < 10 && product.stock_quantity > 0 && (
                      <Badge className="absolute top-3 left-3 z-10 bg-destructive/90 text-destructive-foreground">
                        <TrendingUp className="h-3 w-3 ml-1" />
                        يوشك على النفاذ
                      </Badge>
                    )}
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex-1 mb-4">
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {product.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Price and Action */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {product.price.toFixed(2)} ريال
                          </p>
                          {product.stock_quantity > 0 && (
                            <p className="text-xs text-muted-foreground">
                              متوفر: {product.stock_quantity} قطعة
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all group-hover:scale-105 transform"
                        size="lg"
                        disabled={product.stock_quantity === 0}
                      >
                        <ShoppingCart className="ml-2 h-5 w-5" />
                        {product.stock_quantity > 0 ? 'أضف للسلة' : 'غير متوفر'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Categories Filter - Future Enhancement */}
        {products.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              عرض {products.length} منتج
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
