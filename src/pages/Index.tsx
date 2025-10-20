import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowRight, Sparkles, TruckIcon, Flame, Star } from "lucide-react";
import type { Product } from "@/stores/cartStore";
import heroImage from "@/assets/hero-banner.jpg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PromoCard } from "@/components/PromoCard";
import { CollectionCard } from "@/components/CollectionCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(6);
        
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

      {/* Promotional Banners - Winter Sale */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-slide-up-fade">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Flame className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-bold text-primary uppercase tracking-wider">عروض حصرية</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                عروض الشتاء الحارة 🔥
              </span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              اكتشف أحدث العروض والتخفيضات الحصرية على تيشيرتاتنا المميزة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <PromoCard
              title="تخفيضات الشتاء"
              subtitle="عرض محدود"
              discount="خصم 40%"
              description="احصل على خصم يصل إلى 40% على جميع منتجات المجموعة الشتوية. عرض لفترة محدودة!"
              buttonText="تسوق الآن"
              buttonLink="/products"
              icon="snowflake"
              variant="primary"
              index={0}
            />
            <PromoCard
              title="مجموعة جديدة"
              subtitle="وصل حديثاً"
              description="اكتشف أحدث تصاميمنا الحصرية. تيشيرتات عصرية بجودة استثنائية وألوان رائعة."
              buttonText="استكشف المجموعة"
              buttonLink="/products"
              icon="sparkles"
              variant="secondary"
              index={1}
            />
          </div>

          <div className="max-w-4xl mx-auto">
            <PromoCard
              title="صمم تيشيرتك الخاص"
              subtitle="خدمة حصرية"
              description="هل لديك فكرة مميزة؟ صمم تيشيرتك بنفسك واحصل على منتج فريد يعكس شخصيتك. نوفر لك أفضل جودة طباعة وأقمشة مميزة."
              buttonText="ابدأ التصميم"
              buttonLink="/custom-design"
              icon="tag"
              variant="accent"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Collections Carousel */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Star className="h-5 w-5 text-secondary" />
              <span className="text-sm font-bold text-secondary uppercase tracking-wider">مجموعاتنا المميزة</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                استكشف مجموعاتنا
              </span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              مجموعات مختارة بعناية لتناسب جميع الأذواق والمناسبات
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CollectionCard
                  title="مجموعة الشتاء"
                  description="تيشيرتات دافئة ومريحة مثالية للأجواء الباردة"
                  itemCount={12}
                  category="شتوي"
                  link="/products"
                  index={0}
                />
              </CarouselItem>
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CollectionCard
                  title="التصاميم الكلاسيكية"
                  description="تصاميم خالدة تناسب جميع الأوقات والمناسبات"
                  itemCount={8}
                  category="كلاسيك"
                  link="/products"
                  index={1}
                />
              </CarouselItem>
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CollectionCard
                  title="التصاميم العصرية"
                  description="أحدث صيحات الموضة في عالم التيشيرتات"
                  itemCount={15}
                  category="عصري"
                  link="/products"
                  index={2}
                />
              </CarouselItem>
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <CollectionCard
                  title="الطبعات الفنية"
                  description="تصاميم فنية مبتكرة لعشاق الفن والإبداع"
                  itemCount={10}
                  category="فني"
                  link="/products"
                  index={3}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-primary/30 hover:bg-primary/10 hover:border-primary" />
            <CarouselNext className="hidden md:flex -right-12 border-primary/30 hover:bg-primary/10 hover:border-primary" />
          </Carousel>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/5 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('products.title')}
              </span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              أحدث المنتجات المضافة بأفضل الأسعار
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-card rounded-2xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-500 hover-lift h-full">
                    {/* New Badge */}
                    <div className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full bg-destructive/90 backdrop-blur-sm animate-pulse-glow">
                      <span className="text-xs font-bold text-background uppercase tracking-wider">جديد</span>
                    </div>

                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="h-24 w-24 text-primary/20" />
                        </div>
                      )}
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                      {/* Shimmer */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {product.title}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-sm">عرض التفاصيل</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
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

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.05),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Shipping */}
            <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all hover-lift animate-slide-up-fade">
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mb-6 animate-float">
                <TruckIcon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">{t('shipping.title')}</h3>
              <p className="text-foreground/70">{t('shipping.subtitle')}</p>
            </div>

            {/* Quality */}
            <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-secondary/10 hover:border-secondary/30 transition-all hover-lift animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 mb-6 animate-float" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="h-12 w-12 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">جودة عالية</h3>
              <p className="text-foreground/70">أقمشة فاخرة وطباعة احترافية تدوم طويلاً</p>
            </div>

            {/* Support */}
            <div className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-accent/10 hover:border-accent/30 transition-all hover-lift animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 mb-6 animate-float" style={{ animationDelay: '1s' }}>
                <Star className="h-12 w-12 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">دعم مميز</h3>
              <p className="text-foreground/70">فريق دعم جاهز لمساعدتك في أي وقت</p>
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
