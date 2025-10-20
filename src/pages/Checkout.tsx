import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, ShoppingBag, MapPin, User, Mail, Phone } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "Saudi Arabia",
    notes: "",
  });

  // إذا كانت السلة فارغة، ارجع للمنتجات
  if (items.length === 0) {
    setTimeout(() => navigate("/products"), 100);
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من البيانات
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || 
        !formData.shippingAddress || !formData.shippingCity) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail)) {
      toast.error("الرجاء إدخال بريد إلكتروني صحيح");
      return;
    }

    // التحقق من رقم الهاتف
    const phoneRegex = /^[+0-9\s()-]{10,}$/;
    if (!phoneRegex.test(formData.customerPhone)) {
      toast.error("الرجاء إدخال رقم هاتف صحيح");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalAmount = getTotalPrice();

      // إنشاء الطلب
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          shipping_address: formData.shippingAddress,
          shipping_city: formData.shippingCity,
          shipping_country: formData.shippingCountry,
          notes: formData.notes,
          total_amount: totalAmount,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // إنشاء بنود الطلب
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_title: item.product.title,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
        variant_info: item.variantInfo || null,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // تنظيف السلة
      clearCart();

      // عرض رسالة نجاح
      toast.success("تم إرسال طلبك بنجاح!", {
        description: "سنتواصل معك قريباً لتأكيد الطلب",
      });

      // الانتقال للصفحة الرئيسية
      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      console.error('Error creating order:', error);
      toast.error("حدث خطأ أثناء إرسال الطلب", {
        description: "الرجاء المحاولة مرة أخرى",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                إتمام الطلب
              </span>
            </h1>
            <p className="text-muted-foreground">املأ بياناتك لإتمام عملية الشراء</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* نموذج بيانات الشحن */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 border border-primary/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* المعلومات الشخصية */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold">المعلومات الشخصية</h2>
                    </div>

                    <div>
                      <Label htmlFor="customerName" className="text-foreground">
                        الاسم الكامل <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الكامل"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="customerEmail" className="text-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          البريد الإلكتروني <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="customerEmail"
                          name="customerEmail"
                          type="email"
                          required
                          value={formData.customerEmail}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerPhone" className="text-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          رقم الهاتف <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="customerPhone"
                          name="customerPhone"
                          type="tel"
                          required
                          value={formData.customerPhone}
                          onChange={handleInputChange}
                          placeholder="+966 50 123 4567"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* عنوان الشحن */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-bold">عنوان الشحن</h2>
                    </div>

                    <div>
                      <Label htmlFor="shippingAddress" className="text-foreground">
                        العنوان <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="shippingAddress"
                        name="shippingAddress"
                        required
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        placeholder="الشارع، الحي، رقم المبنى"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shippingCity" className="text-foreground">
                          المدينة <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="shippingCity"
                          name="shippingCity"
                          required
                          value={formData.shippingCity}
                          onChange={handleInputChange}
                          placeholder="الرياض"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="shippingCountry" className="text-foreground">
                          الدولة <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="shippingCountry"
                          name="shippingCountry"
                          required
                          value={formData.shippingCountry}
                          onChange={handleInputChange}
                          placeholder="المملكة العربية السعودية"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-foreground">
                        ملاحظات إضافية (اختياري)
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="أي ملاحظات أو طلبات خاصة..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-glow text-lg py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        جاري إرسال الطلب...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        تأكيد الطلب
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* ملخص الطلب */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-primary/10 sticky top-24">
                <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.image_url && (
                          <img
                            src={item.product.image_url}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.title}</h4>
                        <p className="text-xs text-muted-foreground">الكمية: {item.quantity}</p>
                        <p className="text-sm font-bold text-primary">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-primary/10 pt-4 space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>المجموع الفرعي</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>الشحن</span>
                    <span className="text-green-500">مجاني</span>
                  </div>
                  <div className="border-t border-primary/10 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>الإجمالي</span>
                      <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-center text-muted-foreground">
                    💳 الدفع عند الاستلام متاح
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
