-- Create promotional_banners table for marketing posters
CREATE TABLE IF NOT EXISTS public.promotional_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  button_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.promotional_banners ENABLE ROW LEVEL SECURITY;

-- Public can view active banners
CREATE POLICY "Anyone can view active promotional banners"
ON public.promotional_banners
FOR SELECT
TO anon, authenticated
USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date >= now()));

-- Admins can manage all banners
CREATE POLICY "Admins can view all promotional banners"
ON public.promotional_banners
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert promotional banners"
ON public.promotional_banners
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update promotional banners"
ON public.promotional_banners
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete promotional banners"
ON public.promotional_banners
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_promotional_banners_updated_at
BEFORE UPDATE ON public.promotional_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for banner images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('promotional-banners', 'promotional-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for banner images
CREATE POLICY "Public can view banner images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'promotional-banners');

CREATE POLICY "Admins can upload banner images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'promotional-banners' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update banner images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'promotional-banners' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete banner images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'promotional-banners' AND public.has_role(auth.uid(), 'admin'));