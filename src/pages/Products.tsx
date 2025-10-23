import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore, type Product } from "@/stores/cartStore";
import { ShoppingCart, Star, TrendingUp, Sparkles } from "lucide-react";
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
        toast.error('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      product,
      variantId: product.id,
      quantity: 1,
    });
    toast.success(t('products.addToCart'), {
      description: product.title,
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="auto">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('products.title')}
            </span>
          </h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-[450px] bg-card rounded-2xl animate-shimmer border border-primary/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent shimmer-animation"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <Sparkles className="h-16 w-16 mx-auto mb-4 text-primary animate-pulse" />
            <p className="text-xl text-muted-foreground mb-4">{t('products.noProducts')}</p>
            <p className="text-muted-foreground">أنشئ أول منتج لك وابدأ البيع الآن!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative bg-gradient-card rounded-2xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-hover animate-float"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: `${3 + (index % 3)}s`
                }}
              >
                {/* شارة العروض */}
                {index % 3 === 0 && (
                  <Badge className="absolute top-4 left-4 z-10 bg-destructive/90 backdrop-blur-sm animate-pulse">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    عرض خاص
                  </Badge>
                )}
                
                {/* شارة المخزون المنخفض */}
                {product.stock_quantity && product.stock_quantity < 10 && (
                  <Badge className="absolute top-4 right-4 z-10 bg-orange-500/90 backdrop-blur-sm">
                    بقي {product.stock_quantity} فقط
                  </Badge>
                )}

                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-muted/30 relative group-hover:bg-muted/50 transition-colors">
                    {product.image_url ? (
                      <>
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                        />
                        {/* طبقة تراكب متحركة */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/30">
                        <Sparkles className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-5 space-y-3">
                  {/* التقييم */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${i < 4 ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground mr-2">(4.0)</span>
                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                      {product.title}
                    </h3>
                  </Link>

                  {/* الوصف القصير */}
                  {product.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                      {product.description}
                    </p>
                  )}

                  {/* السعر والفئة */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {product.price.toFixed(2)}
                      </p>
                      {index % 4 === 0 && (
                        <p className="text-xs text-muted-foreground line-through">
                          {(product.price * 1.3).toFixed(2)}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {product.category === 'summer' ? 'صيفي' : product.category === 'winter' ? 'شتوي' : 'مخصص'}
                    </Badge>
                  </div>

                  {/* زر الإضافة للسلة */}
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all duration-300 group/btn relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <ShoppingCart className="mr-2 h-4 w-4 relative z-10 group-hover/btn:animate-bounce" />
                    <span className="relative z-10">{t('products.addToCart')}</span>
                  </Button>
                </div>

                {/* تأثير الوهج المتحرك */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
