import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        products: "Products",
        customDesign: "Custom Design",
        about: "About",
        contact: "Contact",
      },
      hero: {
        title: "Express Yourself",
        subtitle: "Premium T-Shirts & Hoodies with Unique Designs",
        description: "Discover summer tees and winter wear for all ages. Get custom designs tailored to your style.",
        shopNow: "Shop Now",
        customOrder: "Custom Design",
      },
      products: {
        title: "Our Collection",
        noProducts: "No products available yet",
        addToCart: "Add to Cart",
        viewDetails: "View Details",
        summer: "Summer",
        winter: "Winter",
        allProducts: "All Products",
      },
      shipping: {
        title: "Worldwide Shipping",
        subtitle: "We deliver to Sudan and Egypt",
      },
      cart: {
        title: "Shopping Cart",
        empty: "Your cart is empty",
        total: "Total",
        checkout: "Checkout",
        remove: "Remove",
      },
      footer: {
        about: "About lovable T-shirts",
        description: "Premium quality clothing with unique designs for everyone.",
        quickLinks: "Quick Links",
        followUs: "Follow Us",
        rights: "All rights reserved.",
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        products: "المنتجات",
        customDesign: "تصميم مخصص",
        about: "من نحن",
        contact: "اتصل بنا",
      },
      hero: {
        title: "عبّر عن نفسك",
        subtitle: "تيشيرتات وهوديز مميزة بتصاميم فريدة",
        description: "اكتشف التيشيرتات الصيفية والملابس الشتوية لكل الأعمار. احصل على تصاميم مخصصة حسب ذوقك.",
        shopNow: "تسوق الآن",
        customOrder: "اطلب تصميمك",
      },
      products: {
        title: "مجموعتنا",
        noProducts: "لا توجد منتجات متاحة حالياً",
        addToCart: "أضف للسلة",
        viewDetails: "عرض التفاصيل",
        summer: "صيفي",
        winter: "شتوي",
        allProducts: "كل المنتجات",
      },
      shipping: {
        title: "شحن عالمي",
        subtitle: "نوصل للسودان ومصر",
      },
      cart: {
        title: "سلة التسوق",
        empty: "سلتك فارغة",
        total: "المجموع",
        checkout: "إتمام الشراء",
        remove: "حذف",
      },
      footer: {
        about: "عن lovable T-shirts",
        description: "ملابس عالية الجودة بتصاميم فريدة للجميع.",
        quickLinks: "روابط سريعة",
        followUs: "تابعنا",
        rights: "جميع الحقوق محفوظة.",
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
