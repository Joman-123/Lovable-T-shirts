import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Store, Bell, Shield, Mail, Users, Package } from 'lucide-react';
import { toast } from 'sonner';

export function AdminSettings() {
  const handleSaveSettings = () => {
    toast.success('تم حفظ الإعدادات بنجاح');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-2">
        {/* إعدادات المتجر */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              <CardTitle>إعدادات المتجر</CardTitle>
            </div>
            <CardDescription>معلومات أساسية عن المتجر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">اسم المتجر</Label>
              <Input id="store-name" placeholder="Lovable T-shirts" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-description">وصف المتجر</Label>
              <Textarea id="store-description" placeholder="متجر متخصص في بيع القمصان..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">البريد الإلكتروني</Label>
              <Input id="store-email" type="email" placeholder="info@store.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone">رقم الهاتف</Label>
              <Input id="store-phone" type="tel" placeholder="+966 50 123 4567" />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الإشعارات */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>الإشعارات</CardTitle>
            </div>
            <CardDescription>إدارة إشعارات المتجر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-orders">إشعارات الطلبات الجديدة</Label>
                <p className="text-sm text-muted-foreground">تلقي إشعار عند وصول طلب جديد</p>
              </div>
              <Switch id="notify-orders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-designs">إشعارات التصاميم المخصصة</Label>
                <p className="text-sm text-muted-foreground">تلقي إشعار عند طلب تصميم جديد</p>
              </div>
              <Switch id="notify-designs" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notify-stock">تنبيهات المخزون</Label>
                <p className="text-sm text-muted-foreground">تنبيه عند انخفاض المخزون</p>
              </div>
              <Switch id="notify-stock" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="low-stock-threshold">حد التنبيه للمخزون المنخفض</Label>
              <Input id="low-stock-threshold" type="number" placeholder="5" defaultValue="5" />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الأمان */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle>الأمان والخصوصية</CardTitle>
            </div>
            <CardDescription>إعدادات حماية المتجر</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">المصادقة الثنائية</Label>
                <p className="text-sm text-muted-foreground">تفعيل المصادقة الثنائية للحساب</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="login-alerts">تنبيهات تسجيل الدخول</Label>
                <p className="text-sm text-muted-foreground">إشعار عند تسجيل دخول جديد</p>
              </div>
              <Switch id="login-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="require-strong-password">كلمات مرور قوية</Label>
                <p className="text-sm text-muted-foreground">مطالبة العملاء بكلمات مرور معقدة</p>
              </div>
              <Switch id="require-strong-password" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات البريد الإلكتروني */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle>قوالب البريد الإلكتروني</CardTitle>
            </div>
            <CardDescription>تخصيص رسائل البريد</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-order-confirm">رسالة تأكيد الطلب</Label>
                <p className="text-sm text-muted-foreground">إرسال بريد تأكيد تلقائي</p>
              </div>
              <Switch id="email-order-confirm" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-shipping">رسالة الشحن</Label>
                <p className="text-sm text-muted-foreground">إرسال تحديثات الشحن</p>
              </div>
              <Switch id="email-shipping" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-marketing">رسائل تسويقية</Label>
                <p className="text-sm text-muted-foreground">إرسال عروض وتخفيضات</p>
              </div>
              <Switch id="email-marketing" />
            </div>
          </CardContent>
        </Card>

        {/* إدارة المستخدمين */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>إدارة المستخدمين</CardTitle>
            </div>
            <CardDescription>التحكم في صلاحيات المستخدمين</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-registration">السماح بالتسجيل</Label>
                <p className="text-sm text-muted-foreground">السماح للمستخدمين الجدد بالتسجيل</p>
              </div>
              <Switch id="allow-registration" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-verification">تأكيد البريد الإلكتروني</Label>
                <p className="text-sm text-muted-foreground">مطالبة المستخدمين بتأكيد بريدهم</p>
              </div>
              <Switch id="email-verification" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">مدة الجلسة (دقائق)</Label>
              <Input id="session-timeout" type="number" placeholder="60" defaultValue="60" />
            </div>
          </CardContent>
        </Card>

        {/* إعدادات الشحن */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <CardTitle>إعدادات الشحن</CardTitle>
            </div>
            <CardDescription>معلومات الشحن والتوصيل</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shipping-cost">تكلفة الشحن الافتراضية</Label>
              <Input id="shipping-cost" type="number" placeholder="25.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="free-shipping-threshold">حد الشحن المجاني</Label>
              <Input id="free-shipping-threshold" type="number" placeholder="200.00" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="express-shipping">الشحن السريع</Label>
                <p className="text-sm text-muted-foreground">تفعيل خيار الشحن السريع</p>
              </div>
              <Switch id="express-shipping" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-time">وقت التوصيل المتوقع (أيام)</Label>
              <Input id="delivery-time" type="number" placeholder="3-5" defaultValue="5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* زر الحفظ */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow transition-all"
          size="lg"
        >
          حفظ جميع الإعدادات
        </Button>
      </div>
    </div>
  );
}
