import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useCartStore, type Product } from "@/stores/cartStore";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .single();
        
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      product,
      variantId: product.id,
      quantity: 1,
    });

    toast.success(t('products.addToCart'), {
      description: product.title,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="auto">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
          <div className="space-y-4">
            {product.image_url && (
              <div className="aspect-square rounded-lg overflow-hidden bg-muted/50 border border-primary/20">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {product.additional_images && product.additional_images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.additional_images.slice(0, 4).map((image: string, index: number) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted/50 border border-primary/10">
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {product.title}
                </span>
              </h1>
              <p className="text-3xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-foreground/80 leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all"
              size="lg"
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock_quantity > 0 ? t('products.addToCart') : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
