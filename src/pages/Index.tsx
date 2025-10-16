import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Sparkles, TruckIcon } from "lucide-react";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import type { ShopifyProduct } from "@/stores/cartStore";
import heroImage from "@/assets/hero-banner.jpg";

const Index = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 6 });
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background" dir="auto">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-0"></div>
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-glow-pulse">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Premium Quality</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-float">
                {t('hero.title')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-4 font-medium">
              {t('hero.subtitle')}
            </p>
            
            <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary text-background font-bold hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all group"
                >
                  {t('hero.shopNow')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/custom-design">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10 hover:border-primary"
                >
                  {t('hero.customOrder')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('products.title')}
              </span>
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-card rounded-lg animate-pulse border border-primary/10"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">{t('products.noProducts')}</p>
              <p className="text-muted-foreground">Create your first product by telling me what you'd like!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product, index) => (
                <Link
                  key={product.node.id}
                  to={`/product/${product.node.handle}`}
                  className="group animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-card rounded-lg overflow-hidden border border-primary/10 hover:border-primary/30 transition-all hover:shadow-[0_0_30px_rgba(255,193,7,0.2)] h-full">
                    <div className="aspect-square overflow-hidden bg-muted/50">
                      {product.node.images.edges[0] && (
                        <img
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {product.node.title}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products">
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              >
                {t('products.allProducts')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
            <TruckIcon className="h-16 w-16 text-primary animate-float" />
            <div>
              <h3 className="text-2xl font-bold mb-2 text-foreground">{t('shipping.title')}</h3>
              <p className="text-lg text-foreground/80">{t('shipping.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-primary/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-primary">{t('footer.about')}</h4>
              <p className="text-foreground/70">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-primary">{t('footer.quickLinks')}</h4>
              <div className="flex flex-col gap-2">
                <Link to="/products" className="text-foreground/70 hover:text-primary transition-colors">{t('nav.products')}</Link>
                <Link to="/custom-design" className="text-foreground/70 hover:text-primary transition-colors">{t('nav.customDesign')}</Link>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">{t('nav.about')}</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-primary">{t('footer.followUs')}</h4>
              <div className="flex gap-4">
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Facebook</a>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="text-center text-foreground/60 border-t border-primary/20 pt-8">
            <p>© 2024 lovable T-shirts. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
