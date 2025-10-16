import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Sparkles, Shirt, Palette, TruckIcon } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background" dir="auto">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('nav.about')}
              </span>
            </h1>
            <p className="text-xl text-foreground/80">
              قصتنا مع الموضة والتصاميم الفريدة
            </p>
          </div>

          <Card className="p-8 mb-12 bg-card border-primary/20 animate-fade-in-scale">
            <h2 className="text-3xl font-bold mb-6 text-primary">من نحن؟</h2>
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                <strong className="text-primary">lovable T-shirts</strong> هو متجرك المفضل للحصول على تيشيرتات وهوديز بتصاميم عصرية ومميزة. نحن نؤمن بأن الملابس هي وسيلة للتعبير عن الذات وإظهار شخصيتك الفريدة.
              </p>
              <p>
                نقدم مجموعة واسعة من الملابس الصيفية والشتوية لكل الأعمار، بجودة عالية وأسعار تنافسية. سواء كنت تبحث عن تيشيرت خفيف للصيف أو هودي دافئ للشتاء، ستجد ما يناسبك عندنا.
              </p>
              <p>
                ما يميزنا هو خدمة التصميم المخصص - حيث يمكنك طلب تصميمك الخاص وسنحوله إلى واقع على قطعة ملابس فريدة من نوعها تعكس ذوقك الخاص.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20 animate-fade-in-scale">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Shirt className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">جودة عالية</h3>
              </div>
              <p className="text-foreground/80">
                نستخدم أفضل الخامات والأقمشة لضمان راحتك ودوام ملابسك لفترة طويلة. كل قطعة يتم فحصها بعناية قبل الشحن.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20 animate-fade-in-scale" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Palette className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">تصاميم فريدة</h3>
              </div>
              <p className="text-foreground/80">
                فريقنا من المصممين يعمل باستمرار على ابتكار تصاميم جديدة وعصرية تواكب آخر صيحات الموضة العالمية.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">تخصيص كامل</h3>
              </div>
              <p className="text-foreground/80">
                هل لديك تصميم معين في ذهنك؟ نحن هنا لتحقيقه! نقدم خدمة التصميم المخصص لتحصل على قطعة فريدة من نوعها.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20 animate-fade-in-scale" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TruckIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">شحن موثوق</h3>
              </div>
              <p className="text-foreground/80">
                نوصل لك أينما كنت في السودان ومصر. شحن سريع وآمن مع إمكانية تتبع طلبك في كل خطوة.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-primary/20 text-center">
            <h2 className="text-3xl font-bold mb-4 text-primary">رؤيتنا</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              نسعى لأن نكون الخيار الأول في عالم الأزياء العصرية، ونشر ثقافة التعبير عن الذات من خلال الملابس المميزة. نريد أن يشعر كل عميل بالثقة والتميز عند ارتداء منتجاتنا.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
