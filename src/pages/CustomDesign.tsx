import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Sparkles, Send } from "lucide-react";

const CustomDesign = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designDescription: '',
    quantity: '',
    size: '',
    color: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("طلبك قيد المراجعة!", {
      description: "سنتواصل معك قريباً لتأكيد التصميم المخصص.",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      designDescription: '',
      quantity: '',
      size: '',
      color: '',
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="auto">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Custom Design Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('nav.customDesign')}
              </span>
            </h1>
            <p className="text-lg text-foreground/80">
              صمم تيشيرتك أو هودي الخاص بك! شاركنا أفكارك وسنحولها إلى واقع.
            </p>
          </div>

          <Card className="p-8 bg-card border-primary/20 animate-fade-in-scale">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل / Full Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني / Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف / Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-primary/30 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designDescription">وصف التصميم / Design Description *</Label>
                <Textarea
                  id="designDescription"
                  required
                  rows={6}
                  value={formData.designDescription}
                  onChange={(e) => setFormData({ ...formData, designDescription: e.target.value })}
                  placeholder="اشرح لنا التصميم الذي تريده بالتفصيل، الألوان، الرسومات، النصوص..."
                  className="border-primary/30 focus:border-primary resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity">الكمية / Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size">المقاس / Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    placeholder="S, M, L, XL, XXL"
                    className="border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">اللون / Color</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="أصفر، أسود، أبيض..."
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all"
                size="lg"
              >
                <Send className="mr-2 h-5 w-5" />
                إرسال الطلب / Submit Order
              </Button>
            </form>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20">
              <h3 className="text-xl font-bold mb-3 text-primary">كيف يعمل النظام؟</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>1. املأ النموذج بتفاصيل تصميمك</li>
                <li>2. سنراجع طلبك ونتواصل معك خلال 24 ساعة</li>
                <li>3. سنرسل لك نموذج التصميم للموافقة</li>
                <li>4. بعد الموافقة نبدأ الإنتاج والشحن</li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-muted/50 border-primary/20">
              <h3 className="text-xl font-bold mb-3 text-primary">معلومات مهمة</h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• التسليم في 5-7 أيام عمل</li>
                <li>• نقبل جميع أنواع التصاميم</li>
                <li>• أسعار خاصة للطلبات الكبيرة</li>
                <li>• ضمان الجودة 100%</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
