import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronRight, Stethoscope, Syringe, Activity, ShieldPlus, Search, Globe, Loader2 } from 'lucide-react';

const translations = {
  en: {
    skipToMain: "Skip to main content",
    mainNav: "Main Navigation",
    filterProducts: "Filter Products",
    switchLang: "Switch to Arabic",
    topBarText: "Serving the Healthcare Community",
    home: "Home",
    about: "About",
    products: "Products",
    inventory: "Inventory",
    contact: "Contact",
    heroTitle: "Reliable Medical Supplies & Equipment",
    heroDesc: "Providing top-quality healthcare products to hospitals, clinics, and professionals with uncompromising standards.",
    contactBtn: "Contact Us Today",
    aboutTitle: "About Al Fateh",
    aboutP1: "Al Fateh For Medical Supplies is a dedicated distributor of premium medical equipment and consumables. We understand the critical nature of healthcare, which is why we only source products from trusted manufacturers worldwide.",
    aboutP2: "Our mission is to support medical professionals by ensuring they have the right tools at the right time. With years of experience in the industry, we pride ourselves on our reliability, efficiency, and exceptional customer service.",
    productsTitle: "Our Products",
    inventoryTitle: "Store Inventory",
    inventoryDesc: "Browse our currently available stock. Contact us for bulk orders or specific requirements.",
    searchPlaceholder: "Search products by name...",
    allCategories: "All Categories",
    diagnostic: "Diagnostic Equipment",
    consumables: "Consumables",
    surgical: "Surgical Instruments",
    inquireNow: "Inquire Now",
    getInTouch: "Get In Touch",
    contactDesc: "Have a question about our products or need a quote? Contact our team today and we will get back to you promptly.",
    phone: "Phone",
    email: "Email",
    address: "Address",
    addressText: "Prince Abdulaziz Ibn Musaid Ibn Jalawi St، ٌRCRA6447, Riyadh 12626",
    fullName: "Full Name",
    emailAddress: "Email Address",
    message: "Message",
    sendMessage: "Send Message",
    rights: "Al Fateh For Medical Supplies. All rights reserved.",
    noProducts: "No products found matching your search.",
    logoText: "AL FATEH",
    logoSubText: "MEDICAL SUPPLIES"
  },
  ar: {
    skipToMain: "تخطي إلى المحتوى الرئيسي",
    mainNav: "التنقل الرئيسي",
    filterProducts: "تصفية المنتجات",
    switchLang: "Switch to English",
    topBarText: "نخدم مجتمع الرعاية الصحية",
    home: "الرئيسية",
    about: "من نحن",
    products: "المنتجات",
    inventory: "المخزون",
    contact: "اتصل بنا",
    heroTitle: "مستلزمات ومعدات طبية موثوقة",
    heroDesc: "توفير منتجات رعاية صحية عالية الجودة للمستشفيات والعيادات والمهنيين بمعايير لا تقبل المساومة.",
    contactBtn: "اتصل بنا اليوم",
    aboutTitle: "عن الفاتح",
    aboutP1: "الفاتح للمستلزمات الطبية هو موزع مخصص للمعدات والمستهلكات الطبية المتميزة. نحن نتفهم الطبيعة الحرجة للرعاية الصحية، ولهذا السبب نستورد المنتجات فقط من الشركات المصنعة الموثوقة في جميع أنحاء العالم.",
    aboutP2: "مهمتنا هي دعم المهنيين الطبيين من خلال ضمان حصولهم على الأدوات المناسبة في الوقت المناسب. مع سنوات من الخبرة في هذه الصناعة، نفخر بموثوقيتنا وكفاءتنا وخدمة العملاء الاستثنائية.",
    productsTitle: "منتجاتنا",
    inventoryTitle: "مخزون المتجر",
    inventoryDesc: "تصفح مخزوننا المتاح حاليًا. اتصل بنا لطلبات الجملة أو المتطلبات الخاصة.",
    searchPlaceholder: "البحث عن المنتجات بالاسم...",
    allCategories: "جميع الفئات",
    diagnostic: "معدات التشخيص",
    consumables: "المستهلكات",
    surgical: "الأدوات الجراحية",
    inquireNow: "استفسر الآن",
    getInTouch: "تواصل معنا",
    contactDesc: "هل لديك سؤال حول منتجاتنا أو تحتاج إلى عرض أسعار؟ اتصل بفريقنا اليوم وسنرد عليك في أقرب وقت.",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    addressText: "شارع الأمير عبدالعزيز بن مساعد بن جلوي، RCRA6447، الرياض 12626",
    fullName: "الاسم الكامل",
    emailAddress: "البريد الإلكتروني",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    rights: "الفاتح للمستلزمات الطبية. جميع الحقوق محفوظة.",
    noProducts: "لم يتم العثور على منتجات تطابق بحثك.",
    logoText: "الفاتح",
    logoSubText: "للمستلزمات الطبية"
  }
};

const productsList = [
  { id: 1, category: 'diagnostic', icon: Stethoscope, nameEn: 'Digital Blood Pressure Monitor', nameAr: 'جهاز قياس ضغط الدم الرقمي', descEn: 'Accurate and easy-to-use upper arm blood pressure monitor.', descAr: 'جهاز دقيق وسهل الاستخدام لقياس ضغط الدم من أعلى الذراع.' },
  { id: 2, category: 'diagnostic', icon: Activity, nameEn: 'Pulse Oximeter', nameAr: 'مقياس التأكسج النبضي', descEn: 'Portable device to measure oxygen saturation and heart rate.', descAr: 'جهاز محمول لقياس تشبع الأكسجين ومعدل ضربات القلب.' },
  { id: 3, category: 'consumables', icon: Syringe, nameEn: 'Disposable Syringes (100 pack)', nameAr: 'محاقن يمكن التخلص منها (عبوة 100)', descEn: 'Sterile, single-use syringes with needles.', descAr: 'محاقن معقمة للاستخدام مرة واحدة مع إبر.' },
  { id: 4, category: 'consumables', icon: ShieldPlus, nameEn: 'Surgical Masks (50 pack)', nameAr: 'كمامات جراحية (عبوة 50)', descEn: '3-ply protective face masks for medical use.', descAr: 'كمامات واقية من 3 طبقات للاستخدام الطبي.' },
  { id: 5, category: 'surgical', icon: ShieldPlus, nameEn: 'Stainless Steel Scalpel Handles', nameAr: 'مقابض مشرط من الفولاذ المقاوم للصدأ', descEn: 'Reusable, high-grade stainless steel scalpel handles.', descAr: 'مقابض مشرط قابلة لإعادة الاستخدام من الفولاذ المقاوم للصدأ عالي الجودة.' },
  { id: 6, category: 'surgical', icon: ShieldPlus, nameEn: 'Surgical Forceps', nameAr: 'ملقط جراحي', descEn: 'Precision surgical forceps for various procedures.', descAr: 'ملقط جراحي دقيق لمختلف الإجراءات.' },
];

// ==========================================
// INVENTORY MANAGEMENT INSTRUCTIONS
// ==========================================
// To add a new item to your inventory:
// 1. Copy an existing item block: { id: ..., nameEn: ..., ... }
// 2. Paste it inside the inventoryList array below.
// 3. Change the 'id' to a unique number.
// 4. Update the names and descriptions.
// 5. To add your own picture, replace the 'imageUrl' with the link to your image. 
//    (e.g., imageUrl: 'https://yourwebsite.com/images/product1.jpg' OR imageUrl: '/local-image.jpg')
// ==========================================
const inventoryList = [
  { 
    id: 1, 
    nameEn: 'Standard Hospital Bed', 
    nameAr: 'سرير مستشفى قياسي', 
    descEn: 'Manual adjustable bed with side rails.', 
    descAr: 'سرير يدوي قابل للتعديل مع حواجز جانبية.', 
    imageUrl: 'https://picsum.photos/seed/bed/400/300' 
  },
  { 
    id: 2, 
    nameEn: 'Wheelchair - Lightweight', 
    nameAr: 'كرسي متحرك - خفيف الوزن', 
    descEn: 'Foldable aluminum wheelchair for easy transport.', 
    descAr: 'كرسي متحرك من الألومنيوم قابل للطي لسهولة النقل.', 
    imageUrl: 'https://picsum.photos/seed/wheelchair/400/300' 
  },
  { 
    id: 3, 
    nameEn: 'Oxygen Concentrator 5L', 
    nameAr: 'مكثف أكسجين 5 لتر', 
    descEn: 'Medical grade oxygen concentrator for home or clinic use.', 
    descAr: 'مكثف أكسجين طبي للاستخدام المنزلي أو في العيادة.', 
    imageUrl: 'https://picsum.photos/seed/oxygen/400/300' 
  },
];

function Header({ lang, setLang, t, isRtl }: { lang: 'en'|'ar', setLang: (l: 'en'|'ar') => void, t: any, isRtl: boolean }) {
  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-zinc-900 text-white px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900"
      >
        {t.skipToMain}
      </a>

      {/* Top Bar */}
      <div className="bg-zinc-900 text-zinc-300 py-2 px-4 text-sm flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center"><Phone aria-hidden="true" className="w-4 h-4 me-2 text-sky-400" /> <span dir="ltr">{lang === 'ar' ? '٠٥٩ ٤٧٧ ٤٥٤٠' : '059 477 4540'}</span></span>
          <span className="hidden sm:flex items-center"><Mail aria-hidden="true" className="w-4 h-4 me-2 text-sky-400" /> info@alfatehmedical.com</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">{t.topBarText}</span>
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label={t.switchLang}
            className="flex items-center bg-zinc-800 hover:bg-sky-600 hover:text-white px-2 py-1 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            <Globe aria-hidden="true" className="w-4 h-4 me-1" />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 py-6 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <Link to="/" className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-tight text-center sm:text-start hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 px-2 py-1 rounded">
          {t.logoText} <span className="text-sky-500 font-normal">{t.logoSubText}</span>
        </Link>
        <nav aria-label={t.mainNav} className="flex flex-wrap justify-center gap-4 sm:gap-6 font-medium text-zinc-400">
          <a href="/#home" className="hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 px-1">{t.home}</a>
          <a href="/#about" className="hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 px-1">{t.about}</a>
          <a href="/#products" className="hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 px-1">{t.products}</a>
          <Link to="/inventory" className="hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 px-1">{t.inventory}</Link>
          <a href="/#contact" className="hover:text-sky-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 px-1">{t.contact}</a>
        </nav>
      </header>
    </>
  );
}

function Footer({ t }: { t: any }) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-8 px-4 sm:px-8 text-center">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-xl font-bold text-zinc-100 mb-4 md:mb-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950 px-2 py-1 rounded">
          {t.logoText} <span className="text-sky-600 font-normal">{t.logoSubText}</span>
        </Link>
        <p>&copy; {new Date().getFullYear()} {t.rights}</p>
      </div>
    </footer>
  );
}

function MainPage({ lang, setLang, t, isRtl }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = productsList.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.nameAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-zinc-100 font-sans text-zinc-800 flex flex-col">
      <Header lang={lang} setLang={setLang} t={t} isRtl={isRtl} />
      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative bg-zinc-900 py-24 sm:py-32 px-4 sm:px-8 border-b border-zinc-800 overflow-hidden">
          {/* Decorative Background Pattern */}
          <div 
            className="absolute inset-0 opacity-20" 
            style={{ backgroundImage: 'radial-gradient(#a1a1aa 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            aria-hidden="true"
          ></div>
          
          {/* Subtle Glow Effect */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-sky-500/20 blur-[100px] rounded-full pointer-events-none" 
            aria-hidden="true"
          ></div>
          
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
              {t.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.heroDesc}
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-sky-600 text-white px-8 py-4 text-lg font-bold rounded hover:bg-sky-500 hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              {t.contactBtn}
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 px-4 sm:px-8 bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 w-full">
              <div className="bg-zinc-800 w-full h-64 flex items-center justify-center border border-zinc-700 rounded-lg" aria-hidden="true">
                <Activity className="w-24 h-24 text-sky-500" />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">{t.aboutTitle}</h2>
              <div className="w-16 h-1 bg-sky-500 mb-6" aria-hidden="true"></div>
              <p className="text-zinc-400 mb-4 leading-relaxed">{t.aboutP1}</p>
              <p className="text-zinc-400 leading-relaxed">{t.aboutP2}</p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 px-4 sm:px-8 bg-zinc-950 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">{t.productsTitle}</h2>
              <div className="w-16 h-1 bg-sky-500 mx-auto" aria-hidden="true"></div>
            </div>
            
            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <div 
                className="flex flex-wrap gap-2 justify-center md:justify-start"
                role="group" 
                aria-label={t.filterProducts}
              >
                <button 
                  onClick={() => setSelectedCategory('all')}
                  aria-pressed={selectedCategory === 'all'}
                  className={`px-4 py-2 font-medium transition-colors border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${selectedCategory === 'all' ? 'bg-sky-600 text-white border-sky-600' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-sky-500 hover:text-sky-400'}`}
                >
                  {t.allCategories}
                </button>
                <button 
                  onClick={() => setSelectedCategory('diagnostic')}
                  aria-pressed={selectedCategory === 'diagnostic'}
                  className={`px-4 py-2 font-medium transition-colors border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${selectedCategory === 'diagnostic' ? 'bg-sky-600 text-white border-sky-600' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-sky-500 hover:text-sky-400'}`}
                >
                  {t.diagnostic}
                </button>
                <button 
                  onClick={() => setSelectedCategory('consumables')}
                  aria-pressed={selectedCategory === 'consumables'}
                  className={`px-4 py-2 font-medium transition-colors border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${selectedCategory === 'consumables' ? 'bg-sky-600 text-white border-sky-600' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-sky-500 hover:text-sky-400'}`}
                >
                  {t.consumables}
                </button>
                <button 
                  onClick={() => setSelectedCategory('surgical')}
                  aria-pressed={selectedCategory === 'surgical'}
                  className={`px-4 py-2 font-medium transition-colors border cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950 ${selectedCategory === 'surgical' ? 'bg-sky-600 text-white border-sky-600' : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-sky-500 hover:text-sky-400'}`}
                >
                  {t.surgical}
                </button>
              </div>
              
              <div className="relative w-full md:w-72">
                <Search aria-hidden="true" className="absolute start-3 top-2.5 text-zinc-500 w-5 h-5" />
                <input 
                  type="search" 
                  aria-label={t.searchPlaceholder}
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-zinc-700 py-2 ps-10 pe-4 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-zinc-900 text-zinc-100 placeholder-zinc-500"
                />
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredProducts.map(product => {
                  const Icon = product.icon;
                  return (
                    <div key={product.id} className="bg-zinc-900 border border-zinc-800 p-8 hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                      <Icon aria-hidden="true" className="w-12 h-12 text-sky-500 mb-4" />
                      <h3 className="text-xl font-bold text-zinc-100 mb-2">
                        {lang === 'en' ? product.nameEn : product.nameAr}
                      </h3>
                      <p className="text-zinc-400 mb-6 flex-grow">
                        {lang === 'en' ? product.descEn : product.descAr}
                      </p>
                      <a href="/#contact" className="text-zinc-300 font-semibold flex items-center hover:text-sky-400 mt-auto focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-900 w-max px-1">
                        {t.inquireNow} <ChevronRight aria-hidden="true" className={`w-4 h-4 ms-1 ${isRtl ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900 border border-zinc-800" role="status" aria-live="polite">
                <p className="text-zinc-400 text-lg">{t.noProducts}</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-4 sm:px-8 bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">{t.getInTouch}</h2>
              <div className="w-16 h-1 bg-sky-500 mb-6" aria-hidden="true"></div>
              <p className="text-zinc-400 mb-8">{t.contactDesc}</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone aria-hidden="true" className="w-6 h-6 text-sky-500 me-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-zinc-100">{t.phone}</h4>
                    <p className="text-zinc-300 text-lg font-medium" dir="ltr">{lang === 'ar' ? '٠٥٩ ٤٧٧ ٤٥٤٠' : '059 477 4540'}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail aria-hidden="true" className="w-6 h-6 text-sky-500 me-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-zinc-100">{t.email}</h4>
                    <p className="text-zinc-400">info@alfatehmedical.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin aria-hidden="true" className="w-6 h-6 text-sky-500 me-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-zinc-100">{t.address}</h4>
                    <p className="text-zinc-400 whitespace-pre-line">{t.addressText}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <form className="bg-zinc-950 p-6 border border-zinc-800 shadow-sm">
                <div className="mb-4">
                  <label className="block text-zinc-300 font-bold mb-2" htmlFor="name">{t.fullName}</label>
                  <input 
                    className="w-full border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-zinc-900 text-zinc-100 placeholder-zinc-500" 
                    type="text" 
                    id="name" 
                    required
                    aria-required="true"
                    placeholder={lang === 'en' ? "John Doe" : "أحمد محمد"} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-zinc-300 font-bold mb-2" htmlFor="email">{t.emailAddress}</label>
                  <input 
                    className="w-full border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-zinc-900 text-zinc-100 placeholder-zinc-500" 
                    type="email" 
                    id="email" 
                    required
                    aria-required="true"
                    placeholder={lang === 'en' ? "john@example.com" : "ahmed@example.com"} 
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-zinc-300 font-bold mb-2" htmlFor="message">{t.message}</label>
                  <textarea 
                    className="w-full border border-zinc-700 p-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-zinc-900 text-zinc-100 placeholder-zinc-500 h-32" 
                    id="message" 
                    required
                    aria-required="true"
                    placeholder={lang === 'en' ? "How can we help you?" : "كيف يمكننا مساعدتك؟"}
                  ></textarea>
                </div>
                <button 
                  className="bg-sky-600 text-white px-6 py-2 font-bold hover:bg-sky-500 transition-colors w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950" 
                  type="button" 
                  onClick={(e) => e.preventDefault()}
                >
                  {t.sendMessage}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} />
    </div>
  );
}

function InventoryPage({ lang, setLang, t, isRtl }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState<typeof inventoryList>([]);

  useEffect(() => {
    // Simulate fetching inventory data
    const timer = setTimeout(() => {
      setInventoryData(inventoryList);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-zinc-950 font-sans text-zinc-300 flex flex-col">
      <Header lang={lang} setLang={setLang} t={t} isRtl={isRtl} />
      <main id="main-content" className="flex-grow">
        {/* Inventory Section */}
        <section id="inventory" className="py-16 px-4 sm:px-8 bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-100 mb-4">{t.inventoryTitle}</h2>
              <div className="w-16 h-1 bg-sky-500 mx-auto" aria-hidden="true"></div>
              <p className="text-zinc-400 mt-6 max-w-2xl mx-auto">{t.inventoryDesc}</p>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-zinc-500 animate-spin mb-4" />
                <p className="text-zinc-400 font-medium animate-pulse">
                  {lang === 'en' ? 'Loading inventory...' : 'جاري تحميل المخزون...'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {inventoryData.map(item => (
                  <div key={item.id} className="bg-zinc-950 border border-zinc-800 overflow-hidden hover:border-sky-500 hover:shadow-lg hover:shadow-sky-900/20 transition-all flex flex-col">
                    {/* Image Container */}
                    <div className="h-48 bg-zinc-800 w-full overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={lang === 'en' ? item.nameEn : item.nameAr} 
                        className="w-full h-full object-cover opacity-90"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-zinc-100 mb-2">
                        {lang === 'en' ? item.nameEn : item.nameAr}
                      </h3>
                      <p className="text-zinc-400 mb-6 flex-grow">
                        {lang === 'en' ? item.descEn : item.descAr}
                      </p>
                      <a href="/#contact" className="text-zinc-300 font-semibold flex items-center hover:text-sky-400 mt-auto focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-zinc-950 w-max px-1">
                        {t.inquireNow} <ChevronRight aria-hidden="true" className={`w-4 h-4 ms-1 ${isRtl ? 'rotate-180' : ''}`} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer t={t} />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = translations[lang];
  const isRtl = lang === 'ar';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage lang={lang} setLang={setLang} t={t} isRtl={isRtl} />} />
        <Route path="/inventory" element={<InventoryPage lang={lang} setLang={setLang} t={t} isRtl={isRtl} />} />
      </Routes>
    </BrowserRouter>
  );
}
