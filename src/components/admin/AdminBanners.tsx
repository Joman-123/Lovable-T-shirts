import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Upload, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PromotionalBanner {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link_url: string | null;
  button_text: string | null;
  display_order: number;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
}

export const AdminBanners = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<PromotionalBanner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    link_url: "",
    button_text: "",
    display_order: 0,
    is_active: true,
    start_date: "",
    end_date: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const queryClient = useQueryClient();

  const { data: banners, isLoading } = useQuery({
    queryKey: ["promotional-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promotional_banners")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as PromotionalBanner[];
    },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("promotional-banners")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("promotional-banners")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const createBannerMutation = useMutation({
    mutationFn: async (newBanner: {
      title: string;
      subtitle: string | null;
      image_url: string;
      link_url: string | null;
      button_text: string | null;
      display_order: number;
      is_active: boolean;
      start_date: string | null;
      end_date: string | null;
    }) => {
      const { data, error } = await supabase
        .from("promotional_banners")
        .insert([newBanner])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotional-banners"] });
      toast.success("تم إضافة البوستر بنجاح");
      resetForm();
    },
    onError: () => {
      toast.error("فشل في إضافة البوستر");
    },
  });

  const updateBannerMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<PromotionalBanner>;
    }) => {
      const { data, error } = await supabase
        .from("promotional_banners")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotional-banners"] });
      toast.success("تم تحديث البوستر بنجاح");
      resetForm();
    },
    onError: () => {
      toast.error("فشل في تحديث البوستر");
    },
  });

  const deleteBannerMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("promotional_banners")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promotional-banners"] });
      toast.success("تم حذف البوستر بنجاح");
    },
    onError: () => {
      toast.error("فشل في حذف البوستر");
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = editingBanner?.image_url || "";

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (!imageUrl && !editingBanner) {
        toast.error("الرجاء اختيار صورة");
        return;
      }

      const bannerData = {
        title: formData.title,
        subtitle: formData.subtitle || null,
        image_url: imageUrl,
        link_url: formData.link_url || null,
        button_text: formData.button_text || null,
        display_order: formData.display_order,
        is_active: formData.is_active,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      };

      if (editingBanner) {
        updateBannerMutation.mutate({ id: editingBanner.id, updates: bannerData });
      } else {
        createBannerMutation.mutate(bannerData);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ أثناء حفظ البوستر");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      link_url: "",
      button_text: "",
      display_order: 0,
      is_active: true,
      start_date: "",
      end_date: "",
    });
    setImageFile(null);
    setImagePreview("");
    setEditingBanner(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (banner: PromotionalBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || "",
      link_url: banner.link_url || "",
      button_text: banner.button_text || "",
      display_order: banner.display_order,
      is_active: banner.is_active,
      start_date: banner.start_date ? banner.start_date.split("T")[0] : "",
      end_date: banner.end_date ? banner.end_date.split("T")[0] : "",
    });
    setImagePreview(banner.image_url);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">البوسترات الإعلانية</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة بوستر جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "تعديل البوستر" : "إضافة بوستر جديد"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">العنوان *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="subtitle">العنوان الفرعي</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="image">صورة البوستر *</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="link_url">رابط البوستر</Label>
                <Input
                  id="link_url"
                  type="url"
                  value={formData.link_url}
                  onChange={(e) =>
                    setFormData({ ...formData, link_url: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="button_text">نص الزر</Label>
                <Input
                  id="button_text"
                  value={formData.button_text}
                  onChange={(e) =>
                    setFormData({ ...formData, button_text: e.target.value })
                  }
                  placeholder="اطلب الآن"
                />
              </div>

              <div>
                <Label htmlFor="display_order">ترتيب العرض</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">تاريخ البداية</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">تاريخ الانتهاء</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">مفعّل</Label>
              </div>

              <Button type="submit" className="w-full">
                {editingBanner ? "تحديث" : "إضافة"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners?.map((banner) => (
          <Card key={banner.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg">{banner.title}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(banner)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("هل أنت متأكد من حذف هذا البوستر؟")) {
                        deleteBannerMutation.mutate(banner.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              {banner.subtitle && (
                <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
              )}
              {banner.link_url && (
                <a
                  href={banner.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  رابط البوستر
                </a>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  الترتيب: {banner.display_order}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    banner.is_active
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {banner.is_active ? "مفعّل" : "معطّل"}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {banners?.length === 0 && (
        <Card className="p-12 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">لا توجد بوسترات إعلانية</h3>
          <p className="text-muted-foreground mb-4">
            ابدأ بإضافة بوسترات تسويقية جذابة لعرضها في الصفحة الرئيسية
          </p>
        </Card>
      )}
    </div>
  );
};
