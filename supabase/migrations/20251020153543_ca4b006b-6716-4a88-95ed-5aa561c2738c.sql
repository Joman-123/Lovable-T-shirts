-- تعديل سياسات RLS للسماح بالطلبات من الضيوف (guest checkout)

-- إزالة السياسات القديمة
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;

-- السماح للجميع بإنشاء طلبات (guest checkout)
CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- السماح للجميع بإنشاء بنود الطلب
CREATE POLICY "Anyone can create order items"
ON public.order_items
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- تحديث سياسة الأدمن لعرض جميع الطلبات (موجودة بالفعل لكن نتأكد منها)
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- السماح للعملاء المسجلين برؤية طلباتهم الخاصة
DROP POLICY IF EXISTS "Customers can view their own orders" ON public.orders;
CREATE POLICY "Customers can view their own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  auth.uid() = customer_id OR 
  customer_email = (SELECT email FROM auth.users WHERE id = auth.uid())
);