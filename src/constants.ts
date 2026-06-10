import { Product, Category, Order, Vendor, Customer } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'الكل', icon: 'LayoutGrid' },
  { id: 'electronics', name: 'إلكترونيات', icon: 'Smartphone' },
  { id: 'mobiles', name: 'موبايلات', icon: 'Smartphone', parentId: 'electronics' },
  { id: 'tvs', name: 'تلفزيونات', icon: 'Tv', parentId: 'electronics' },
  { id: 'computer_world', name: 'عالم الكمبيوتر', icon: 'Cpu', parentId: 'electronics' },
  { id: 'headphones', name: 'سماعات', icon: 'Headphones', parentId: 'electronics' },
  { id: 'smartwatches', name: 'ساعات ذكية', icon: 'Watch', parentId: 'electronics' },
  { id: 'laptops', name: 'لابتوب', icon: 'Laptop', parentId: 'electronics' },
  { id: 'speakers', name: 'سبيكر', icon: 'Speaker', parentId: 'electronics' },
  { id: 'mobile_accessories', name: 'اكسسوارات موبايل', icon: 'Cable', parentId: 'electronics' },
  { id: 'printer_supplies', name: 'مستلزمات طابعة', icon: 'Printer', parentId: 'electronics' },
  { id: 'cameras', name: 'كاميرات', icon: 'Camera', parentId: 'electronics' },
  { id: 'fashion', name: 'أزياء', icon: 'Shirt' },
  { id: 'men', name: 'رجالي', icon: 'User', parentId: 'fashion' },
  { id: 'women', name: 'نسائي', icon: 'User', parentId: 'fashion' },
  { id: 'girls', name: 'بناتي', icon: 'Baby', parentId: 'fashion' },
  { id: 'boys', name: 'ولادي', icon: 'Baby', parentId: 'fashion' },
  { id: 'kids', name: 'الأطفال', icon: 'Baby', parentId: 'fashion' },
  { id: 'travel_essentials', name: 'مستلزمات السفر', icon: 'Briefcase', parentId: 'fashion' },
  { id: 'shoes', name: 'الأحذية', icon: 'Footprints', parentId: 'fashion' },
  { id: 'watches_fashion', name: 'الساعات', icon: 'Watch', parentId: 'fashion' },
  { id: 'sportswear', name: 'ملابس رياضية', icon: 'Dumbbell', parentId: 'fashion' },
  { id: 'home', name: 'المنزل', icon: 'Home' },
  { id: 'cleaning_tools', name: 'أدوات التنظيف', icon: 'BrushCleaning', parentId: 'home' },
  { id: 'bedding', name: 'الفراش', icon: 'Bed', parentId: 'home' },
  { id: 'storage_organization', name: 'التخزين والتنظيم', icon: 'Archive', parentId: 'home' },
  { id: 'furniture', name: 'الأثاث', icon: 'Sofa', parentId: 'home' },
  { id: 'home_appliances', name: 'الأجهزة المنزلية', icon: 'Microwave', parentId: 'home' },
  { id: 'waste_recycling', name: 'النفايات وإعادة التدوير', icon: 'Recycle', parentId: 'home' },
  { id: 'home_decor', name: 'ديكور المنزل', icon: 'Palette', parentId: 'home' },
  { id: 'beepharma', name: 'BeePharma', icon: 'Bug' },
  { id: 'honey', name: 'عسل', icon: 'Droplets', parentId: 'beepharma' },
  { id: 'creams', name: 'كريمات', icon: 'Sparkles', parentId: 'beepharma' },
  { id: 'herbs', name: 'أعشاب', icon: 'Leaf', parentId: 'beepharma' },
  { id: 'shampoos', name: 'شامبوهات', icon: 'Bath', parentId: 'beepharma' },
  { id: 'incense', name: 'بخور', icon: 'Wind', parentId: 'beepharma' },
  { id: 'natural_soap', name: 'صابون طبيعي', icon: 'Square', parentId: 'beepharma' },
  { id: 'therapeutic_mixtures', name: 'خلطات علاجية', icon: 'FlaskConical', parentId: 'beepharma' },
  { id: 'beauty', name: 'الجمال', icon: 'Sparkles' },
  { id: 'skin_care', name: 'العناية بالبشرة', icon: 'Sparkles', parentId: 'beauty' },
  { id: 'makeup', name: 'المكياج', icon: 'Palette', parentId: 'beauty' },
  { id: 'hair_care', name: 'العناية بالشعر', icon: 'Scissors', parentId: 'beauty' },
  { id: 'mens_perfumes', name: 'عطور رجالية', icon: 'Flame', parentId: 'beauty' },
  { id: 'womens_perfumes', name: 'عطور نسائية', icon: 'Flame', parentId: 'beauty' },
  { id: 'mens_care', name: 'العناية بالرجال', icon: 'User', parentId: 'beauty' },
  { id: 'seasonal_products', name: 'منتجات موسمية', icon: 'Sun', parentId: 'beauty' },
  { id: 'beauty_devices', name: 'أجهزة الجمال', icon: 'Zap', parentId: 'beauty' },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ساعة ذكية برو',
    description: 'ساعة ذكية متطورة مع تتبع الصحة والأنشطة الرياضية وشاشة AMOLED.',
    price: 299,
    quantity: 15,
    category: 'smartwatches',
    image: 'https://picsum.photos/seed/watch/400/400',
    images: [],
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: '2',
    name: 'سماعات لاسلكية',
    description: 'سماعات بلوتوث مع خاصية إلغاء الضجيج وبطارية تدوم طويلاً.',
    price: 150,
    quantity: 20,
    category: 'headphones',
    image: 'https://picsum.photos/seed/earbuds/400/400',
    images: [],
    rating: 4.5,
    reviewsCount: 89
  },
  {
    id: '3',
    name: 'قميص قطني عصري',
    description: 'قميص مريح مصنوع من القطن الطبيعي 100% بتصميم كلاسيكي.',
    price: 45,
    quantity: 50,
    category: 'men',
    image: 'https://picsum.photos/seed/shirt/400/400',
    images: [],
    rating: 4.2,
    reviewsCount: 56
  },
  {
    id: '4',
    name: 'حقيبة ظهر جلدية',
    description: 'حقيبة ظهر أنيقة ومتينة مناسبة للعمل والسفر.',
    price: 85,
    quantity: 10,
    category: 'travel_essentials',
    image: 'https://picsum.photos/seed/backpack/400/400',
    images: [],
    rating: 4.4,
    reviewsCount: 34
  },
  {
    id: '5',
    name: 'ماكينة قهوة أوتوماتيكية',
    description: 'استمتع بأفضل كوب قهوة في منزلك مع هذه الماكينة سهلة الاستخدام.',
    price: 450,
    quantity: 5,
    category: 'home_appliances',
    image: 'https://picsum.photos/seed/coffee/400/400',
    images: [],
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: '6',
    name: 'مجموعة العناية بالبشرة',
    description: 'مجموعة متكاملة لترطيب وتغذية البشرة بمكونات طبيعية.',
    price: 120,
    quantity: 30,
    category: 'skin_care',
    image: 'https://picsum.photos/seed/skincare/400/400',
    images: [],
    rating: 4.6,
    reviewsCount: 45
  },
  {
    id: '7',
    name: 'جهاز لابتوب ألترا',
    description: 'لابتوب فائق النحافة مع معالج قوي وشاشة 4K للعمل الإبداعي والألعاب.',
    price: 1299,
    quantity: 8,
    category: 'laptops',
    image: 'https://picsum.photos/seed/laptop/400/400',
    images: [],
    rating: 4.9,
    reviewsCount: 32
  },
  {
    id: 'bee-1',
    name: 'عسل النحل الطبيعي - BeePharma',
    description: 'عسل نحل طبيعي 100% غني بالفيتامينات والمعادن لتعزيز المناعة.',
    price: 45,
    quantity: 100,
    category: 'honey',
    image: 'https://picsum.photos/seed/honey/400/400',
    images: [],
    rating: 5.0,
    reviewsCount: 150
  },
  {
    id: 'bee-2',
    name: 'كريم مرطب طبيعي',
    description: 'كريم غني بزبدة الشيا والزيوت الطبيعية لترطيب عميق.',
    price: 35,
    quantity: 50,
    category: 'creams',
    image: 'https://picsum.photos/seed/cream/400/400',
    images: [],
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: 'bee-3',
    name: 'مجموعة أعشاب مهدئة',
    description: 'مزيج من الأعشاب الطبيعية للمساعدة على الاسترخاء والنوم الهادئ.',
    price: 25,
    quantity: 80,
    category: 'herbs',
    image: 'https://picsum.photos/seed/herbs/400/400',
    images: [],
    rating: 4.7,
    reviewsCount: 65
  },
  {
    id: 'bee-4',
    name: 'بخور عود فاخر',
    description: 'بخور عود طبيعي برائحة زكية تدوم طويلاً.',
    price: 60,
    quantity: 30,
    category: 'incense',
    image: 'https://picsum.photos/seed/incense/400/400',
    images: [],
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: 'bee-5',
    name: 'صابون زيت الزيتون الطبيعي',
    description: 'صابون مصنوع يدوياً من زيت الزيتون النقي للبشرة الحساسة.',
    price: 15,
    quantity: 120,
    category: 'natural_soap',
    image: 'https://picsum.photos/seed/soap/400/400',
    images: [],
    rating: 4.6,
    reviewsCount: 54
  },
  {
    id: '8',
    name: 'نظام مسرح منزلي فاخر',
    description: 'تجربة سينمائية متكاملة في منزلك مع صوت محيطي 7.1 وتقنية لاسلكية.',
    price: 2499,
    quantity: 3,
    category: 'tvs',
    image: 'https://picsum.photos/seed/theater/400/400',
    images: [],
    rating: 5.0,
    reviewsCount: 12
  },
  {
    id: 'beauty-sub-1',
    name: 'أحمر شفاه كلاسيكي مطفأ',
    description: 'أحمر شفاه كريمي باللون الأحمر الكلاسيكي وثبات يدوم طويلاً دون جفاف.',
    price: 25,
    quantity: 40,
    category: 'makeup',
    image: 'https://picsum.photos/seed/lipstick/400/400',
    images: [],
    rating: 4.7,
    reviewsCount: 82
  },
  {
    id: 'beauty-sub-2',
    name: 'سيروم مغذي للشعر بالأرغان',
    description: 'سيروم طبيعي يعيد اللمعان والقوة للشعر التالف ويمنع التقصف.',
    price: 39,
    quantity: 25,
    category: 'hair_care',
    image: 'https://picsum.photos/seed/haircare/400/400',
    images: [],
    rating: 4.8,
    reviewsCount: 95
  },
  {
    id: 'beauty-sub-3',
    name: 'عطر فرنسي فاخر - لافي',
    description: 'عطر فرنسي كلاسيكي بمزيج من أزهار الياسمين والخشب الأبيض والمسك.',
    price: 110,
    quantity: 15,
    category: 'womens_perfumes',
    image: 'https://picsum.photos/seed/perfume/400/400',
    images: [],
    rating: 4.9,
    reviewsCount: 150
  },
  {
    id: 'beauty-sub-5',
    name: 'عطر بلو شانيل المثير للرجال',
    description: 'عطر رجالي منعش وفواح بملاحظات الحمضيات والأخشاب الدافئة والعود الخفيف.',
    price: 125,
    quantity: 20,
    category: 'mens_perfumes',
    image: 'https://picsum.photos/seed/mensperfume/400/400',
    images: [],
    rating: 4.9,
    reviewsCount: 210
  },
  {
    id: 'beauty-sub-4',
    name: 'جهاز تنظيف البشرة بالموجات',
    description: 'جهاز متطور لتنظيف وإزالة الرؤوس السوداء والشوائب بلطف وتقشير الخلايا.',
    price: 75,
    quantity: 12,
    category: 'beauty_devices',
    image: 'https://picsum.photos/seed/beautydevice/400/400',
    images: [],
    rating: 4.5,
    reviewsCount: 28
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-1',
    customerName: 'أحمد محمد',
    items: [{ productId: '1', name: 'ساعة ذكية برو', quantity: 1, price: 299 }],
    total: 299,
    status: 'delivered',
    date: '2024-03-15'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-2',
    customerName: 'سارة خالد',
    items: [{ productId: '3', name: 'قميص قطني عصري', quantity: 2, price: 45 }],
    total: 90,
    status: 'processing',
    date: '2024-03-20'
  }
];

export const MOCK_VENDORS: Vendor[] = [
  {
    id: 'VEN-1',
    name: 'عبدالله علي',
    email: 'abdullah@example.com',
    storeName: 'عالم التقنية',
    category: 'إلكترونيات',
    sales: 15400,
    rating: 4.8,
    status: 'active',
    joinDate: '2023-01-10'
  },
  {
    id: 'VEN-2',
    name: 'ليلى حسن',
    email: 'laila@example.com',
    storeName: 'أزياء ليلى',
    category: 'أزياء',
    sales: 8200,
    rating: 4.5,
    status: 'pending',
    joinDate: '2024-02-15'
  }
];

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    totalOrders: 5,
    totalSpent: 1250,
    status: 'active'
  },
  {
    id: 'CUST-2',
    name: 'سارة خالد',
    email: 'sara@example.com',
    totalOrders: 2,
    totalSpent: 180,
    status: 'active'
  }
];
