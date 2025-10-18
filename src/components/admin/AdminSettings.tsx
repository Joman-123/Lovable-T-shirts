import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Store, Bell, Shield, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AdminSettings() {
  const [storeName, setStoreName] = useState("متجر لوفبل");
  const [storeDescription, setStoreDescription] = useState("أفضل متجر للقمصان المميزة");
  const [contactEmail, setContactEmail] = useState("info@store.com");
  const [contactPhone, setContactPhone] = useState("+966501234567");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSaveSettings = () => {
    // في المستقبل: حفظ الإعدادات في قاعدة البيانات
    toast.success("تم حفظ الإعدادات بنجاح!");
  };

  return (
    <div className="space-y-6">
      {/* Store Settings */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <CardTitle>إعدادات المتجر</CardTitle>
          </div>
          <CardDescription>
            قم بتخصيص معلومات وإعدادات متجرك
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">اسم المتجر</Label>
            <Input
              id="store-name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="أدخل اسم المتجر"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="store-description">وصف المتجر</Label>
            <Textarea
              id="store-description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              placeholder="أدخل وصف المتجر"
              rows={3}
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact-email">البريد الإلكتروني</Label>
              <Input
                id="contact-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone">رقم الهاتف</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+966 50 123 4567"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>الإشعارات</CardTitle>
          </div>
          <CardDescription>
            إدارة إعدادات الإشعارات والتنبيهات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>تفعيل الإشعارات</Label>
              <p className="text-sm text-muted-foreground">
                احصل على إشعارات عند ورود طلبات جديدة
              </p>
            </div>
            <Switch
              checked={enableNotifications}
              onCheckedChange={setEnableNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>إشعارات البريد الإلكتروني</Label>
              <p className="text-sm text-muted-foreground">
                استقبل تحديثات المتجر عبر البريد
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>الأمان والخصوصية</CardTitle>
          </div>
          <CardDescription>
            إعدادات الأمان والحماية للمتجر
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-destructive">وضع الصيانة</Label>
              <p className="text-sm text-muted-foreground">
                إخفاء المتجر عن الزوار مؤقتاً
              </p>
            </div>
            <Switch
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>تغيير كلمة المرور</Label>
            <Button variant="outline" className="w-full">
              <Shield className="h-4 w-4 ml-2" />
              تحديث كلمة المرور
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <CardTitle>قوالب البريد الإلكتروني</CardTitle>
          </div>
          <CardDescription>
            تخصيص رسائل البريد للعملاء
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            تخصيص رسالة تأكيد الطلب
          </Button>
          <Button variant="outline" className="w-full justify-start">
            تخصيص رسالة شحن المنتج
          </Button>
          <Button variant="outline" className="w-full justify-start">
            تخصيص رسالة الترحيب
          </Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          إلغاء التغييرات
        </Button>
        <Button
          onClick={handleSaveSettings}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          <Settings className="h-4 w-4 ml-2" />
          حفظ الإعدادات
        </Button>
      </div>
    </div>
  );
}
