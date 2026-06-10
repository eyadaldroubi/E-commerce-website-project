/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  Tag,
  Ticket,
  LayoutGrid,
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Package,
  ShoppingCart,
  ChevronLeft,
  Star,
  Heart,
  ArrowRight,
  Filter,
  CheckCircle2,
  Users,
  Store,
  ClipboardList,
  TrendingUp,
  MoreVertical,
  Calendar,
  DollarSign,
  CreditCard,
  Printer,
  Truck,
  MapPin,
  FileText,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  AlertCircle,
  User as UserIcon,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  ShieldCheck,
  UserCircle,
  Moon,
  Sun,
  Tv,
  Cpu,
  Laptop,
  Headphones,
  Watch,
  Speaker,
  Cable,
  Camera,
  Baby,
  Briefcase,
  Footprints,
  Dumbbell,
  Bed,
  Archive,
  Sofa,
  Microwave,
  Recycle,
  Palette,
  BrushCleaning,
  Bug,
  Droplets,
  Leaf,
  Bath,
  Wind,
  Square,
  FlaskConical,
  Scissors,
  Flame,
  Zap,
  Volume2,
  RotateCcw,
  Send,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import { Product, Category, CartItem, Order, Vendor, Customer, User, HeroImage, Deal } from './types';
import { INITIAL_PRODUCTS, CATEGORIES, MOCK_ORDERS, MOCK_VENDORS, MOCK_CUSTOMERS } from './constants';

const DEFAULT_DEALS: Deal[] = [
  {
    id: 'deal-1',
    title: 'خصم العسل الطبيعي الممتاز',
    description: 'احصل على خصم فوري 20% عند شراء أي عبوة عسل سدر متميز لتعزيز صحتك ومناعتك.',
    discountPercentage: 20,
    code: 'HONEY20',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400',
    productId: 'bee-1'
  },
  {
    id: 'deal-2',
    title: 'عرض التوفير للغذاء الملكي والبروبوليس',
    description: 'وفر 15% على كبسولات الغذاء الملكي المدعمة بالجينسينغ والبروبوليس النشط.',
    discountPercentage: 15,
    code: 'ROYAL15',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=400',
    productId: 'bee-2'
  },
  {
    id: 'deal-3',
    title: 'تخفيض خاص على فيتامين C الطبيعي',
    description: 'احمِ عائلتك بخصم 10% على كافة مستخلصات ومكملات فيتامين C المركزة.',
    discountPercentage: 10,
    code: 'VITAMINC10',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1616679911721-fe6eec10fcd8?auto=format&fit=crop&q=80&w=400',
    productId: '6'
  }
];

import ProductCard from './components/ProductCard';
import HeroCarousel from './components/HeroCarousel';
import { aiService } from './services/aiService';

import AdminPanel from './components/AdminPanel';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-8 text-center">
          <div className="max-w-md space-y-4">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">حدث خطأ ما</h1>
            <p className="text-slate-500">نعتذر عن هذا الخلل. يرجى محاولة إعادة تحميل الصفحة.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Home: <Home className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Tv: <Tv className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Laptop: <Laptop className="w-4 h-4" />,
  Headphones: <Headphones className="w-4 h-4" />,
  Watch: <Watch className="w-4 h-4" />,
  Speaker: <Speaker className="w-4 h-4" />,
  Cable: <Cable className="w-4 h-4" />,
  Printer: <Printer className="w-4 h-4" />,
  Camera: <Camera className="w-4 h-4" />,
  User: <UserIcon className="w-4 h-4" />,
  Baby: <Baby className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Footprints: <Footprints className="w-4 h-4" />,
  Dumbbell: <Dumbbell className="w-4 h-4" />,
  Bed: <Bed className="w-4 h-4" />,
  Archive: <Archive className="w-4 h-4" />,
  Sofa: <Sofa className="w-4 h-4" />,
  Microwave: <Microwave className="w-4 h-4" />,
  Recycle: <Recycle className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  BrushCleaning: <BrushCleaning className="w-4 h-4" />,
  Bug: <Bug className="w-4 h-4" />,
  Droplets: <Droplets className="w-4 h-4" />,
  Leaf: <Leaf className="w-4 h-4" />,
  Bath: <Bath className="w-4 h-4" />,
  Wind: <Wind className="w-4 h-4" />,
  Square: <Square className="w-4 h-4" />,
  FlaskConical: <FlaskConical className="w-4 h-4" />,
  Scissors: <Scissors className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Sun: <Sun className="w-4 h-4" />,
};

const ProductGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 relative overflow-hidden rounded-t-[40px] md:rounded-tr-none md:rounded-l-[40px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIdx}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            src={images[activeIdx]}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="p-4 flex gap-3 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-sm border-t border-white/20">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeIdx === idx ? 'border-indigo-600 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
            >
              <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AIChatBot: React.FC<{ 
  products: Product[], 
  isOpen: boolean, 
  setIsOpen: (open: boolean) => void,
  messages: any[],
  setMessages: (msgs: any[]) => void,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
  onAddToCart?: (product: Product, discountPercentage?: number, promoCode?: string) => void
}> = ({ products, isOpen, setIsOpen, messages, setMessages, isLoading, setIsLoading, onAddToCart }) => {
  const [input, setInput] = useState('');
  const [activeSpeechIndex, setActiveSpeechIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Quick suggestions for a therapeutic store (BeePharma)
  const suggestions = [
    { text: 'ما هي أفضل خلطات المناعة لديكم؟ 🛡️', query: 'ما هي أفضل الخلطات والمكملات المتوفرة لتعزيز المناعة والنشاط والوقاية الطبيعية؟' },
    { text: 'أريد نوع عسل ممتاز ومجرب 🍯', query: 'أريد ترشيحاً لأفضل أنواع عسل النحل الطبيعي المتوفرة في المتجر ووصف فوائدها.' },
    { text: 'هل تتوفر صوابين وكريمات للبشرة؟ ✨', query: 'ما هي الكريمات والصوابين الطبيعية المتاحة للعناية المتكاملة بالبشرة؟' },
    { text: 'ما هي أقوى عروض وتخفيضات اليوم؟ 🏷️', query: 'أخبرني عن كوبونات الخصم والصفقات الحصرية النشطة في المتجر حالياً.' }
  ];

  const handleSend = async (customQuery?: string) => {
    const textToSend = customQuery || input;
    if (!textToSend.trim() || isLoading) return;

    // Stop speaking if any is playing
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setActiveSpeechIndex(null);
    }
    
    const userMsg = { role: 'user' as const, parts: [{ text: textToSend }] };
    setMessages([...messages, userMsg]);
    if (!customQuery) setInput('');
    setIsLoading(true);

    const response = await aiService.chatWithAssistant(textToSend, products, messages);
    setMessages([...messages, userMsg, { role: 'model' as const, parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  // Speaks aloud the bot text
  const handleTTS = (text: string, idx: number) => {
    if (!('speechSynthesis' in window)) return;
    
    if (activeSpeechIndex === idx) {
      window.speechSynthesis.cancel();
      setActiveSpeechIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    
    // Clean emojis and symbols for better Arabic TTS flow
    const cleanText = text
      .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, "")
      .trim();
      
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(v => v.lang.includes('ar') || v.lang.includes('SA'));
    if (arVoice) {
      utterance.voice = arVoice;
    }

    utterance.onend = () => {
      setActiveSpeechIndex(null);
    };
    utterance.onerror = () => {
      setActiveSpeechIndex(null);
    };

    setActiveSpeechIndex(idx);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearHistory = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSpeechIndex(null);
    setMessages([]);
  };

  // Try to find physical products in the AI answer text to show custom Shoppable Widgets
  const detectProductsInText = (text: string): Product[] => {
    if (!text || !products) return [];
    
    const matched: Product[] = [];
    const textLower = text.toLowerCase();
    
    for (const p of products) {
      const pNameLower = p.name.toLowerCase();
      // Look for full name or subkeywords
      if (textLower.includes(pNameLower)) {
        matched.push(p);
        continue;
      }
      
      // Match by dividing multiword names (e.g. "عسل سدر")
      const keywords = pNameLower.split(/[\s\-]+/);
      let matchesAll = false;
      if (keywords.length >= 2) {
        matchesAll = keywords.every(kw => kw.length >= 3 && textLower.includes(kw));
      }
      
      if (matchesAll) {
        matched.push(p);
      }
    }
    
    // De-duplicate matched products
    return Array.from(new Set(matched)).slice(0, 3);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group hover:shadow-indigo-300/50"
      >
        {isOpen ? <X className="w-6 h-6 animate-spin-once" /> : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border border-white rounded-full animate-pulse" />
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-24 right-4 md:right-6 w-[340px] md:w-[410px] h-[550px] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-50 text-right"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-4 py-4 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-emerald-400 border border-indigo-600 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight">المساعد الذكي الفائق 🧠✨</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-[10px] text-indigo-100 font-medium">ذكي ومباشر - متصل بـ BeePharma</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button 
                    onClick={handleClearHistory}
                    title="مسح المحادثة بالكامل"
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-100 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-100 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-2">
                  <div className="w-20 h-20 bg-gradient-to-tr from-indigo-100 to-purple-100 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
                    <Sparkles className="w-10 h-10 text-indigo-600 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-900 text-base">مرحباً بك في الخدمة الذكية المحدثة!</h5>
                    <p className="text-xs text-slate-500 max-w-[280px]">
                      أنا مساعدك الصيدلاني والطبيعي الفائق لمتجر <span className="font-semibold text-indigo-600">BeePharma</span>. كيف تفضل أن أساعدك اليوم؟
                    </p>
                  </div>
                  
                  {/* Suggestion Chips */}
                  <div className="grid grid-cols-1 gap-2 w-full pt-4">
                    {suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug.query)}
                        className="text-right text-xs bg-white hover:bg-indigo-50/50 text-slate-700 border border-slate-200 hover:border-indigo-200 p-3 rounded-2xl transition-all shadow-sm flex items-center justify-between group active:scale-95"
                      >
                        <span className="font-medium group-hover:text-indigo-600">{sug.text}</span>
                        <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, idx) => {
                    const isUser = msg.role === 'user';
                    const msgText = msg.parts?.[0]?.text || '';
                    const matchedProducts = !isUser ? detectProductsInText(msgText) : [];

                    return (
                      <div key={idx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}>
                        <div className={`flex items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[85%]`}>
                          {/* Avatar for model */}
                          {!isUser && (
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                              <Sparkles className="w-4 h-4 text-amber-200" />
                            </div>
                          )}
                          
                          <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                            isUser 
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-md shadow-indigo-100' 
                              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                          }`}>
                            <p className="whitespace-pre-wrap">{msgText}</p>
                            
                            {/* Speech Button for AI models */}
                            {!isUser && (
                              <div className="flex justify-end border-t border-slate-100 mt-2 pt-1.5">
                                <button 
                                  onClick={() => handleTTS(msgText, idx)}
                                  className={`flex items-center gap-1 text-[11px] font-bold ${activeSpeechIndex === idx ? 'text-indigo-600 animate-pulse' : 'text-slate-400 hover:text-indigo-600'} transition-colors`}
                                  title="استمع للإجابة"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>{activeSpeechIndex === idx ? "جاري القراءة..." : "استمع للقراءة"}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Matched Shoppable Product widget inside the chat flow! */}
                        {matchedProducts.length > 0 && (
                          <div className="w-full pl-10 pr-2 mt-2 space-y-2">
                            <p className="text-[11px] font-bold text-slate-400">🎁 المنتجات المذكورة في الرد المتاحة للشراء فوراً:</p>
                            <div className="flex flex-col gap-2">
                              {matchedProducts.map((p) => (
                                <div 
                                  key={p.id}
                                  className="flex items-center gap-3 bg-indigo-50/50 hover:bg-indigo-50 p-2.5 rounded-2xl border border-indigo-100 transition-all text-right shadow-sm"
                                >
                                  <img 
                                    src={p.image} 
                                    alt={p.name} 
                                    className="w-12 h-12 rounded-xl object-cover border border-white shrink-0" 
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h6 className="font-bold text-xs text-slate-800 truncate">{p.name}</h6>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs font-bold text-indigo-600">{p.price} ر.س</span>
                                      <div className="flex items-center text-[10px] text-amber-500 font-bold">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline ml-0.5" />
                                        {p.rating}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {onAddToCart && p.quantity > 0 && (
                                    <button
                                      onClick={() => onAddToCart(p)}
                                      className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl transition-all shadow-sm shrink-0"
                                    >
                                      أضف للسلة 🛒
                                    </button>
                                  )}
                                  {p.quantity === 0 && (
                                    <span className="text-[11px] text-red-500 font-bold border border-red-200 px-2 py-0.5 rounded-lg shrink-0">نفذت</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Loader Wave */}
              {isLoading && (
                <div className="flex items-start gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
                  </div>
                  <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none shadow-inner flex flex-col space-y-1.5">
                    <p className="text-xs text-slate-400 font-semibold italic animate-pulse">مساعد BeePharma يقوم بتركيب الرد الذكي الآن...</p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="اسأل المساعد الذكي عن العسل، الخلطات، أو عروض اليوم..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 text-slate-800 placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-30 disabled:scale-100 active:scale-95 shrink-0 shadow-md shadow-indigo-100"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DEFAULT_USERS: User[] = [
  { id: '1', name: 'المدير العام', email: 'eyad@shop.com', password: '0001', role: 'admin', avatar: 'https://i.pravatar.cc/150?u=admin' },
  { id: '2', name: 'إياد الدروبي', email: 'user@shop.com', password: 'user', role: 'user', avatar: 'https://i.pravatar.cc/150?u=user' },
];

export default function AppWrapper() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shop_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shop_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const saved = localStorage.getItem('shop_vendors');
    return saved ? JSON.parse(saved) : MOCK_VENDORS;
  });
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('shop_customers');
    return saved ? JSON.parse(saved) : MOCK_CUSTOMERS;
  });
  const [heroImages, setHeroImages] = useState<HeroImage[]>(() => {
    const saved = localStorage.getItem('shop_hero_images');
    return saved ? JSON.parse(saved) : [
      { id: '1', url: 'https://picsum.photos/seed/modern-tech/1600/800', title: 'اكتشف مستقبل التسوق الرقمي', subtitle: 'منتجات مختارة بعناية لتناسب احتياجاتك اليومية بأفضل الأسعار وأسرع توصيل.' },
      { id: '2', url: 'https://picsum.photos/seed/fashion/1600/800', title: 'أحدث صيحات الموضة', subtitle: 'تشكيلة واسعة من الملابس والإكسسوارات العصرية.' }
    ];
  });
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('shop_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shop_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [view, setView] = useState<'shop' | 'admin' | 'checkout' | 'invoice' | 'auth' | 'profile' | 'deals'>(() => {
    const saved = localStorage.getItem('shop_view');
    return (saved as any) || 'shop';
  });
  const [adminSubView, setAdminSubView] = useState<'products' | 'orders' | 'vendors' | 'customers' | 'reports' | 'hero' | 'deals'>('products');

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState(0);
  
  // Auth State
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('shop_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shop_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', street: '', province: '' });
  const [authError, setAuthError] = useState('');

  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Deals and Discounts State
  const [deals, setDeals] = useState<Deal[]>(() => {
    const saved = localStorage.getItem('shop_deals');
    return saved ? JSON.parse(saved) : DEFAULT_DEALS;
  });

  const [activeDealIndex, setActiveDealIndex] = useState(0);
  const activeDeals = useMemo(() => deals.filter(d => d.isActive), [deals]);

  useEffect(() => {
    if (activeDeals.length <= 1) return;
    const interval = setInterval(() => {
      setActiveDealIndex(prev => (prev + 1) % activeDeals.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeDeals.length]);

  useEffect(() => {
    setActiveDealIndex(0);
  }, [activeDeals.length]);

  useEffect(() => {
    localStorage.setItem('shop_deals', JSON.stringify(deals));
  }, [deals]);

  // AI State

  const [viewedProducts, setViewedProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shop_viewed_products');
    return saved ? JSON.parse(saved) : [];
  });
  const [recommendedProductIds, setRecommendedProductIds] = useState<string[]>([]);
  const recommendedProducts = useMemo(() => {
    if (recommendedProductIds.length > 0) {
      const recs = products.filter(p => recommendedProductIds.includes(p.id));
      if (recs.length > 0) return recs;
    }
    // Fallback: top rated / premium products
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [products, recommendedProductIds]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', parts: { text: string }[] }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [inventoryPredictions, setInventoryPredictions] = useState<any[]>([]);
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const [smartSearchResultIds, setSmartSearchResultIds] = useState<string[] | null>(null);

  // WebSocket Logic
  const wsRef = useRef<WebSocket | null>(null);
  const isRemoteUpdate = useRef(false);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('Connected to real-time server');
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        isRemoteUpdate.current = true;
        
        switch (message.type) {
          case 'UPDATE_PRODUCTS':
            setProducts(message.data);
            break;
          case 'UPDATE_ORDERS':
            setOrders(message.data);
            break;
          case 'UPDATE_VENDORS':
            setVendors(message.data);
            break;
          case 'UPDATE_CUSTOMERS':
            setCustomers(message.data);
            break;
          case 'UPDATE_HERO_IMAGES':
            setHeroImages(message.data);
            break;
        }
        
        setTimeout(() => {
          isRemoteUpdate.current = false;
        }, 100);
      } catch (err) {
        console.error('Error handling real-time update:', err);
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from real-time server. Retrying...');
      // Simple retry logic could go here
    };

    wsRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const broadcastUpdate = useCallback((type: string, data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && !isRemoteUpdate.current) {
      wsRef.current.send(JSON.stringify({ type, data }));
    }
  }, []);

  // Broadcast changes when state updates (if not from remote)
  useEffect(() => {
    if (!isRemoteUpdate.current && currentUser) {
      broadcastUpdate('UPDATE_PRODUCTS', products);
    }
  }, [products, broadcastUpdate, currentUser]);

  useEffect(() => {
    if (!isRemoteUpdate.current && currentUser?.role === 'admin') {
      broadcastUpdate('UPDATE_ORDERS', orders);
    }
  }, [orders, broadcastUpdate, currentUser]);

  useEffect(() => {
    if (!isRemoteUpdate.current && currentUser?.role === 'admin') {
      broadcastUpdate('UPDATE_VENDORS', vendors);
    }
  }, [vendors, broadcastUpdate, currentUser]);

  useEffect(() => {
    if (!isRemoteUpdate.current && currentUser?.role === 'admin') {
      broadcastUpdate('UPDATE_CUSTOMERS', customers);
    }
  }, [customers, broadcastUpdate, currentUser]);

  useEffect(() => {
    if (!isRemoteUpdate.current && currentUser?.role === 'admin') {
      broadcastUpdate('UPDATE_HERO_IMAGES', heroImages);
    }
  }, [heroImages, broadcastUpdate, currentUser]);

  // Save users to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_users', JSON.stringify(users));
  }, [users]);

  // Save current user to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Save products to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_products', JSON.stringify(products));
  }, [products]);

  // Save orders to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_orders', JSON.stringify(orders));
  }, [orders]);

  // Save vendors to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_vendors', JSON.stringify(vendors));
  }, [vendors]);

  // Save hero images to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_hero_images', JSON.stringify(heroImages));
  }, [heroImages]);

  // Save customers to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_customers', JSON.stringify(customers));
  }, [customers]);

  // Save cart to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_cart', JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Save view to localStorage
  React.useEffect(() => {
    localStorage.setItem('shop_view', view);
  }, [view]);

  // AI Effects
  useEffect(() => {
    localStorage.setItem('shop_viewed_products', JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (viewedProducts.length > 0) {
        const userOrders = orders.filter(o => o.customerId === currentUser?.email);
        const ids = await aiService.getRecommendedProducts(viewedProducts, products, userOrders);
        setRecommendedProductIds(ids);
      }
    };
    fetchRecommendations();
  }, [viewedProducts, products, orders, currentUser]);

  useEffect(() => {
    const fetchInventoryPredictions = async () => {
      if (currentUser?.role === 'admin' && view === 'admin') {
        const predictions = await aiService.predictInventory(products, orders);
        setInventoryPredictions(predictions);
      }
    };
    fetchInventoryPredictions();
  }, [products, orders, currentUser, view]);

  useEffect(() => {
    const performSmartSearch = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSmartSearching(true);
        const ids = await aiService.smartSearch(searchQuery, products);
        setSmartSearchResultIds(ids);
        setIsSmartSearching(false);
      } else {
        setSmartSearchResultIds(null);
      }
    };
    const timer = setTimeout(performSmartSearch, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, products]);
  
  // Admin State
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [selectedProductForDetails, _setSelectedProductForDetails] = useState<Product | null>(null);
  const trackView = useCallback((product: Product) => {
    setViewedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev;
      const newViewed = [product, ...prev].slice(0, 10);
      return newViewed;
    });
  }, []);

  const setSelectedProductForDetails = useCallback((product: Product | null) => {
    if (product) trackView(product);
    _setSelectedProductForDetails(product);
  }, [trackView]);
  const [userRating, setUserRating] = useState<number>(0);

  const handleRateProduct = useCallback((productId: string, rating: number) => {
    if (!currentUser) return;
    
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newReviewsCount = p.reviewsCount + 1;
        const newRating = ((p.rating * p.reviewsCount) + rating) / newReviewsCount;
        return { ...p, rating: parseFloat(newRating.toFixed(1)), reviewsCount: newReviewsCount };
      }
      return p;
    }));
    
    setNotification({ message: 'شكراً لتقييمك!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
    setUserRating(0);
  }, [currentUser]);

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'electronics',
    image: 'https://picsum.photos/seed/new/400/400',
    images: [],
    rating: 5,
    reviewsCount: 0,
    quantity: 10
  });
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // Checkout State
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [shippingInfo, setShippingInfo] = useState({ street: '', city: '', country: 'السعودية' });
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'stripe' | 'card'>('card');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // PayPal credential state
  const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  const [isPaypalAuthorizing, setIsPaypalAuthorizing] = useState(false);
  const [isPaypalAuthorized, setIsPaypalAuthorized] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const subCategories = CATEGORIES.filter(c => c.parentId === selectedCategory).map(c => c.id);
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory || subCategories.includes(p.category);
      
      // Smart search logic
      let matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (smartSearchResultIds && smartSearchResultIds.length > 0) {
        matchesSearch = matchesSearch || smartSearchResultIds.includes(p.id);
      }

      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesRating = p.rating >= minRating;
      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });
  }, [products, selectedCategory, searchQuery, priceRange, minRating, smartSearchResultIds]);

  const addToCart = useCallback((product: Product, discountPercentage?: number, promoCode?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { 
                ...item, 
                cartQuantity: Math.min(item.cartQuantity + 1, product.quantity),
                appliedDiscountPercentage: discountPercentage !== undefined ? discountPercentage : item.appliedDiscountPercentage,
                promoCode: promoCode !== undefined ? promoCode : item.promoCode
              }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        cartQuantity: 1, 
        appliedDiscountPercentage: discountPercentage, 
        promoCode: promoCode 
      }];
    });
    setNotification({
      message: `تم إضافة "${product.name}" إلى السلة ${discountPercentage ? `مع تطبيق خصم ${discountPercentage}%!` : ''}`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      const isWishlisted = prev.some(p => p.id === product.id);
      if (isWishlisted) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, Math.min(item.cartQuantity + delta, item.quantity));
        return { ...item, cartQuantity: newQty };
      }
      return item;
    }));
  }, []);

  const cartTotal = cart.reduce((sum, item) => {
    const finalPrice = item.price * (1 - (item.appliedDiscountPercentage || 0) / 100);
    return sum + finalPrice * item.cartQuantity;
  }, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.cartQuantity, 0);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    if (!currentUser) {
      setNotification({ message: 'الرجاء تسجيل الدخول أولاً لإحضار عنوان الشحن وإتمام الشراء بنجاح', type: 'error' });
      setTimeout(() => setNotification(null), 3500);
      setAuthMode('login');
      setView('auth');
    } else {
      setView('checkout');
      setCheckoutStep(1);
    }
  }, [cart.length, currentUser]);

  useEffect(() => {
    if (currentUser) {
      setShippingInfo({
        street: currentUser.street || '',
        city: currentUser.province || '',
        country: 'سوريا'
      });
    }
  }, [currentUser]);

  const completeOrder = useCallback(() => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      customerId: currentUser?.id || 'CUST-TEMP',
      customerName: currentUser?.name || 'عميل جديد',
      items: cart.map(item => {
        const effectivePrice = item.price * (1 - (item.appliedDiscountPercentage || 0) / 100);
        return {
          productId: item.id,
          name: item.name + (item.appliedDiscountPercentage ? ` (خصم ${item.appliedDiscountPercentage}%)` : ''),
          quantity: item.cartQuantity,
          price: effectivePrice
        };
      }),
      total: cartTotal,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      paymentMethod,
      shippingAddress: shippingInfo
    };

    // Update Inventory
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(item => item.id === p.id);
      if (cartItem) {
        return { ...p, quantity: p.quantity - cartItem.cartQuantity };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setCart([]);
    setView('invoice');
  }, [cart, cartTotal, currentUser, paymentMethod, shippingInfo]);

  const handleAuth = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (authMode === 'login') {
      const user = users.find(u => u.email === authForm.email && u.password === authForm.password);
      if (user) {
        setCurrentUser(user);
        setView('shop');
        setAuthForm({ name: '', email: '', password: '', street: '', province: '' });
      } else {
        setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } else {
      if (users.find(u => u.email === authForm.email)) {
        setAuthError('البريد الإلكتروني مسجل مسبقاً');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: authForm.name,
        email: authForm.email,
        password: authForm.password,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?u=${authForm.email}`,
        street: authForm.street,
        province: authForm.province
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setView('shop');
      setAuthForm({ name: '', email: '', password: '', street: '', province: '' });
    }
  }, [authMode, authForm, users]);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setView('shop');
  }, []);

  const updateProfile = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setUsers(prev => prev.map(u => u.id === currentUser.id ? currentUser : u));
    setNotification({ message: 'تم تحديث الملف الشخصي بنجاح', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  }, [currentUser]);

  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(o => o.customerId === currentUser.id);
  }, [orders, currentUser]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status'], tracking?: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, trackingNumber: tracking || o.trackingNumber } : o));
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleGalleryUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ 
          ...prev, 
          images: [...(prev.images || []), reader.result as string] 
        }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeGalleryImage = useCallback((index: number) => {
    setNewProduct(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  }, []);

  const addProduct = useCallback(() => {
    if (!newProduct.name || !newProduct.price) return;
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...newProduct as Product } : p));
      setEditingProduct(null);
    } else {
      const product: Product = {
        ...newProduct as Product,
        id: `PROD-${Math.floor(Math.random() * 10000)}`,
      };
      setProducts(prev => [product, ...prev]);
    }
    
    setIsAddProductModalOpen(false);
    setNewProduct({
      name: '',
      price: 0,
      category: 'electronics',
      image: 'https://picsum.photos/seed/new/400/400',
      rating: 5,
      reviewsCount: 0,
      quantity: 10,
      description: ''
    });
  }, [newProduct, editingProduct]);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
    setIsAddOrderModalOpen(false);
  }, []);

  const updateOrder = useCallback((orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, ...updates } : o));
    setEditingOrder(null);
  }, []);

  const addCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
    setIsAddCustomerModalOpen(false);
  }, []);

  const updateCustomer = useCallback((customerId: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, ...updates } : c));
    setEditingCustomer(null);
  }, []);

  const deleteCustomer = useCallback((customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  }, []);

  const addVendor = useCallback((vendor: Vendor) => {
    setVendors(prev => [vendor, ...prev]);
    setIsAddVendorModalOpen(false);
  }, []);

  const updateVendor = useCallback((vendorId: string, updates: Partial<Vendor>) => {
    setVendors(prev => prev.map(v => v.id === vendorId ? { ...v, ...updates } : v));
    setEditingVendor(null);
    setIsAddVendorModalOpen(false);
  }, []);

  const deleteVendor = useCallback((vendorId: string) => {
    setVendors(prev => prev.filter(v => v.id !== vendorId));
  }, []);

  const updateProductPrice = useCallback((productId: string) => {
    const price = parseFloat(tempPrice);
    if (isNaN(price)) return;
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, price } : p));
    setEditingPriceId(null);
  }, [tempPrice]);

  const deleteProduct = useCallback((productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  }, []);

  const addHeroImage = useCallback((image: HeroImage) => {
    setHeroImages(prev => [...prev, image]);
  }, []);

  const removeHeroImage = useCallback((id: string) => {
    setHeroImages(prev => prev.filter(img => img.id !== id));
  }, []);

  const updateHeroImage = useCallback((updatedImage: HeroImage) => {
    setHeroImages(prev => prev.map(img => img.id === updatedImage.id ? updatedImage : img));
  }, []);

  const addDeal = useCallback((deal: Deal) => {
    setDeals(prev => [...prev, deal]);
  }, []);

  const deleteDeal = useCallback((id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
  }, []);

  const updateDeal = useCallback((updatedDeal: Deal) => {
    setDeals(prev => prev.map(d => d.id === updatedDeal.id ? updatedDeal : d));
  }, []);


  const goHome = useCallback(() => {
    setView('shop');
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 10000]);
    setMinRating(0);
  }, []);

  const printInvoice = useCallback(() => {
    window.print();
  }, []);

  // Mock Report Data
  const salesData = useMemo(() => [
    { name: 'يناير', sales: 4000, orders: 240 },
    { name: 'فبراير', sales: 3000, orders: 198 },
    { name: 'مارس', sales: 2000, orders: 150 },
    { name: 'أبريل', sales: 2780, orders: 190 },
    { name: 'مايو', sales: 1890, orders: 120 },
    { name: 'يونيو', sales: 2390, orders: 170 },
  ], []);

  const categoryData = useMemo(() => [
    { name: 'إلكترونيات', value: 400 },
    { name: 'أزياء', value: 300 },
    { name: 'منزل', value: 300 },
    { name: 'جمال', value: 200 },
  ], []);

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] transition-colors duration-300">
      {/* Modern Navigation */}
      <header className="glass-nav px-6 py-4 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={goHome}
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">متجري <span className="text-indigo-600">الذكي</span></h1>
            </div>

            <button
              onClick={() => setView('deals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                view === 'deals' 
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-100 scale-105' 
                  : 'text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              العروض والتخفيضات 🏷️
            </button>


            <div className="hidden md:flex items-center bg-slate-50 rounded-2xl px-4 py-2.5 w-80 group focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 group-focus-within:text-indigo-600" />
              <input 
                type="text" 
                placeholder="ابحث عن أي شيء..."
                className="bg-transparent border-none focus:ring-0 text-sm px-3 w-full placeholder:text-slate-400 text-slate-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser?.role === 'admin' && (
              <button 
                onClick={() => setView(prev => prev === 'admin' ? 'shop' : 'admin')}
                className={`p-2.5 rounded-xl transition-all ${view === 'admin' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:bg-slate-50'}`}
                title="لوحة التحكم"
              >
                <ShieldCheck className="w-5 h-5" />
              </button>
            )}
            
            {currentUser ? (
              <button 
                onClick={() => setView('profile')}
                className={`flex items-center gap-2 p-1.5 rounded-xl transition-all ${view === 'profile' ? 'bg-white text-indigo-600 border border-slate-100' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-sm font-bold hidden sm:inline">{currentUser.name}</span>
              </button>
            ) : (
              <button 
                onClick={() => { setAuthMode('login'); setView('auth'); }}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-all"
              >
                <LogIn className="w-5 h-5" />
                <span className="text-sm font-bold">دخول</span>
              </button>
            )}

            <button 
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-all relative"
              title="المفضلة"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-bold">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4">
          <div className={`px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {view === 'shop' && (
            <motion.div 
              key="shop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
            {/* Category Navigation - Easy & Modern */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`category-pill ${selectedCategory === 'all' ? 'category-pill-active' : 'category-pill-inactive'}`}
                >
                  الكل
                </button>
                {CATEGORIES.filter(c => !c.parentId).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`category-pill flex items-center gap-2 ${
                      selectedCategory === cat.id || CATEGORIES.find(c => c.id === selectedCategory)?.parentId === cat.id 
                      ? 'category-pill-active' 
                      : 'category-pill-inactive'
                    }`}
                  >
                    {iconMap[cat.icon]}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              {(() => {
                const currentCat = CATEGORIES.find(c => c.id === selectedCategory);
                const parentId = currentCat?.parentId || (CATEGORIES.some(c => c.parentId === selectedCategory) ? selectedCategory : null);
                const subCats = CATEGORIES.filter(c => c.parentId === parentId);
                
                if (subCats.length > 0) {
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 px-2"
                    >
                      {subCats.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedCategory(sub.id)}
                          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                            selectedCategory === sub.id 
                            ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200 shadow-sm' 
                            : 'bg-slate-50 text-slate-500 border-2 border-transparent hover:bg-slate-100'
                          }`}
                        >
                          {iconMap[sub.icon]}
                          {sub.name}
                        </button>
                      ))}
                    </motion.div>
                  );
                }
                return null;
              })()}
            </div>

            {/* Hero Banner - Simple & Clean */}
            {selectedCategory === 'all' && searchQuery === '' && priceRange[0] === 0 && minRating === 0 && (
              <HeroCarousel heroImages={heroImages} />
            )}

            {/* Featured Deals & Offers - Horizontal Slider Carousel ABOVE Recommendations */}
            {selectedCategory === 'all' && searchQuery === '' && priceRange[0] === 0 && minRating === 0 && activeDeals.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {currentUser?.role === 'admin' && (
                    <button 
                      onClick={() => {
                        setView('admin');
                        setAdminSubView('deals');
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-extrabold bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl border border-indigo-100 transition-all flex items-center gap-1.5"
                    >
                      إدارة وتعديل العروض ⚙️
                    </button>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
                      <Tag className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-slate-900">أقوى العروض والتخفيضات 🏷️</h3>
                      <p className="text-xs text-slate-500 font-medium font-sans">خصومات كبرى وعروض حصرية متجددة تلقائياً </p>
                    </div>
                  </div>
                </div>

                {/* Horizontal Banner Container */}
                <div className="relative overflow-hidden bg-gradient-to-l from-rose-50/70 via-indigo-50/30 to-white border border-rose-100/60 rounded-[32px] p-6 shadow-md shadow-rose-100/10">
                  <div className="relative min-h-[220px] flex items-center">
                    <AnimatePresence mode="wait">
                      {activeDeals[activeDealIndex] && (
                        <motion.div
                          key={`deal-slide-${activeDeals[activeDealIndex].id}`}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.35 }}
                          className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                        >
                          {/* Left Column (Image) - Occupies 5 cols on md+ */}
                          {activeDeals[activeDealIndex].image && (
                            <div className="md:col-span-5 h-48 md:h-56 rounded-2xl overflow-hidden relative shadow-inner bg-slate-100">
                              <img 
                                src={activeDeals[activeDealIndex].image} 
                                alt={activeDeals[activeDealIndex].title} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-3 right-3 bg-rose-600 text-white font-black text-xs px-3.5 py-1.5 rounded-xl shadow-lg">
                                خصم {activeDeals[activeDealIndex].discountPercentage}%
                              </div>
                              
                              {currentUser?.role === 'admin' && (
                                <button 
                                  onClick={() => {
                                    setView('admin');
                                    setAdminSubView('deals');
                                  }}
                                  className="absolute bottom-3 right-3 bg-slate-900/95 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg shadow-md border border-white/10 hover:bg-rose-600 transition-all"
                                >
                                  ⚙️ تعديل كمدير
                                </button>
                              )}
                            </div>
                          )}

                          {/* Right Column (Details) - Occupies 7 cols on md+ */}
                          <div className={`space-y-4 text-right flex flex-col justify-between ${activeDeals[activeDealIndex].image ? 'md:col-span-7' : 'md:col-span-12'}`}>
                            <div className="space-y-2">
                              <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold inline-block">
                                عرض ترويجي مميز 🌟
                              </span>
                              <h4 className="font-extrabold text-slate-900 text-xl md:text-2xl leading-tight">
                                {activeDeals[activeDealIndex].title}
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed max-w-xl font-medium">
                                {activeDeals[activeDealIndex].description}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 items-center pt-2 justify-start">
                              {/* Direct product link button - opens product details popup as requested */}
                              {(() => {
                                const deal = activeDeals[activeDealIndex];
                                const linkedProduct = products.find(p => p.id === deal.productId);
                                if (!linkedProduct) return null;
                                const discountedPrice = (linkedProduct.price * (1 - deal.discountPercentage / 100)).toFixed(2);
                                return (
                                  <button
                                    onClick={() => {
                                      setSelectedProductForDetails(linkedProduct);
                                    }}
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-indigo-100 flex items-center gap-1.5"
                                  >
                                    🛍️ اطلب المنتج مباشرة (${discountedPrice} <span className="line-through text-indigo-300 font-normal">${linkedProduct.price}</span>)
                                  </button>
                                );
                              })()}

                              {activeDeals[activeDealIndex].code && (
                                <div className="flex items-center justify-between w-full sm:w-auto bg-white border border-slate-200/80 px-4 py-2 rounded-xl gap-4">
                                  <span className="text-[11px] text-slate-400 font-bold">كود الخصم:</span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono font-black text-indigo-600 text-xs tracking-wider bg-indigo-50/50 px-2.5 py-1 rounded-lg border border-indigo-100/50">
                                      {activeDeals[activeDealIndex].code}
                                    </span>
                                    <button 
                                      onClick={() => {
                                        navigator.clipboard.writeText(activeDeals[activeDealIndex].code || '');
                                        setNotification({ message: `تم نسخ الكود (${activeDeals[activeDealIndex].code}) بنجاح!`, type: 'success' });
                                        setTimeout(() => setNotification(null), 3500);
                                      }}
                                      className="text-indigo-600 hover:text-indigo-700 font-extrabold text-[11px] hover:underline"
                                    >
                                      نسخ
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Dots */}
                  {activeDeals.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-4">
                      {activeDeals.map((_, idx) => (
                        <button
                          key={`dot-${idx}`}
                          onClick={() => setActiveDealIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${idx === activeDealIndex ? 'w-6 bg-rose-600' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* AI Recommendations - Always Visible on Homepage */}
            {selectedCategory === 'all' && searchQuery === '' && priceRange[0] === 0 && minRating === 0 && recommendedProducts.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-slate-900">مقترحات قد تعجبك</h3>
                    <p className="text-xs text-slate-500">توصيات مخصصة لك من منتجاتنا الممتازة</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recommendedProducts.map((product, idx) => (
                    <ProductCard 
                      key={`rec-${product.id}`}
                      product={product}
                      idx={idx}
                      categories={CATEGORIES}
                      onAddToCart={addToCart}
                      onViewDetails={setSelectedProductForDetails}
                      isWishlisted={wishlist.some(p => p.id === product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Product Grid - Clean & Easy */}
            <div id="products-section" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedCategory === 'all' ? 'جميع المنتجات' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-400">السعر:</span>
                    <select 
                      className="text-sm font-bold bg-transparent border-none focus:ring-0 p-0"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'all') setPriceRange([0, 10000]);
                        else if (val === 'low') setPriceRange([0, 100]);
                        else if (val === 'mid') setPriceRange([100, 500]);
                        else if (val === 'high') setPriceRange([500, 1000]);
                        else if (val === 'premium') setPriceRange([1000, 10000]);
                      }}
                    >
                      <option value="all">الكل</option>
                      <option value="low">أقل من $100</option>
                      <option value="mid">$100 - $500</option>
                      <option value="high">$500 - $1000</option>
                      <option value="premium">أكثر من $1000</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-400">التقييم:</span>
                    <select 
                      className="text-sm font-bold bg-transparent border-none focus:ring-0 p-0"
                      onChange={(e) => setMinRating(Number(e.target.value))}
                    >
                      <option value="0">الكل</option>
                      <option value="4">4 نجوم وأكثر</option>
                      <option value="3">3 نجوم وأكثر</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard 
                      key={product.id}
                      product={product}
                      idx={idx}
                      categories={CATEGORIES}
                      onAddToCart={addToCart}
                      onViewDetails={setSelectedProductForDetails}
                      isWishlisted={wishlist.some(p => p.id === product.id)}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

          {view === 'checkout' && (
            <motion.div 
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto space-y-8"
            >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">إتمام الشراء</h2>
              <div className="flex items-center gap-4">
                {[1, 2, 3].map(step => (
                  <div key={step} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${checkoutStep >= step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {step}
                    </div>
                    {step < 3 && <div className={`w-8 h-0.5 ${checkoutStep > step ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="modern-card p-8 space-y-8">
              {checkoutStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-600" /> معلومات الشحن المعتمدة
                  </h3>
                  
                  {currentUser && currentUser.street && currentUser.province ? (
                    <div className="bg-indigo-50/60 border border-indigo-100/80 p-6 rounded-3xl space-y-4">
                      <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-base">عنوان التسليم المحفوظ في حسابك:</p>
                          <p className="text-sm text-slate-600 mt-2">
                            <strong className="text-slate-900">المحافظة:</strong> {currentUser.province}
                          </p>
                          <p className="text-sm text-slate-600 mt-1">
                            <strong className="text-slate-900">اسم الشارع والحي:</strong> {currentUser.street}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-indigo-500 border-t border-indigo-100/50 pt-3">
                        • تم جلب العنوان تلقائياً من معلومات تسجيل الدخول الخاصة بك تيسيراً لطلبك. لتصحيحه، يُرجى زيارة "الملف الشخصي".
                      </p>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl space-y-4">
                      <p className="font-bold text-amber-900">لم تقم بإدخال عنوان شحن كامل في حسابك بعد!</p>
                      <p className="text-xs text-amber-700">
                        الرجاء كتابة العنوان أدناه، وسيتم تخزينه في ملفك الشخصي تلقائياً لتسهيل طلباتك القادمة:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-900">اسم الشارع</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 transition-all"
                            placeholder="اسم الشارع، رقم المبنى"
                            value={shippingInfo.street}
                            onChange={e => {
                              const v = e.target.value;
                              setShippingInfo(prev => ({ ...prev, street: v }));
                              if (currentUser) {
                                const updated = { ...currentUser, street: v };
                                setCurrentUser(updated);
                                setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updated : u));
                              }
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-900">المحافظة</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 transition-all"
                            placeholder="مثال: حمص"
                            value={shippingInfo.city}
                            onChange={e => {
                              const v = e.target.value;
                              setShippingInfo(prev => ({ ...prev, city: v }));
                              if (currentUser) {
                                const updated = { ...currentUser, province: v };
                                setCurrentUser(updated);
                                setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updated : u));
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button 
                      onClick={() => setView('shop')}
                      className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      إلغاء والعودة للمتجر
                    </button>
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      disabled={!shippingInfo.street || !shippingInfo.city}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                      الاستمرار للدفع
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" /> طريقة الدفع
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'card', name: 'بطاقة ائتمانية', icon: <CreditCard className="w-5 h-5" /> },
                      { id: 'paypal', name: 'PayPal', icon: <div className="font-bold italic text-blue-800">PayPal</div> },
                      { id: 'stripe', name: 'Stripe', icon: <div className="font-bold text-indigo-500">Stripe</div> }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${paymentMethod === method.id ? 'border-indigo-600 bg-slate-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          {method.icon}
                          <div className="text-right">
                            <span className="font-bold text-slate-900 block">{method.name}</span>
                            {method.id === 'paypal' && (
                              <span className={`text-xs font-bold block mt-0.5 ${isPaypalAuthorized ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {isPaypalAuthorized ? `✓ تم ربط حسابك: ${paypalEmail}` : 'يتطلب تسجيل الدخول وتفويض الحساب الدفعي'}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.id === 'paypal' && !isPaypalAuthorized && paymentMethod === 'paypal' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsPaypalModalOpen(true);
                              }}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-md transition-all ml-2"
                            >
                              تسجيل الدخول الآن
                            </button>
                          )}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'}`}>
                            {paymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      رجوع
                    </button>
                    <button 
                      onClick={() => {
                        if (paymentMethod === 'paypal' && !isPaypalAuthorized) {
                          setIsPaypalModalOpen(true);
                        } else {
                          setCheckoutStep(3);
                        }
                      }}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      {paymentMethod === 'paypal' && !isPaypalAuthorized ? 'تسجيل الدخول في PayPal أولاً' : 'مراجعة الطلب'}
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" /> مراجعة الطلب
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500">العنوان:</span>
                      <span className="font-bold text-slate-900">{shippingInfo.street}، {shippingInfo.city}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-slate-500">طريقة الدفع:</span>
                      <span className="font-bold text-slate-900 uppercase">{paymentMethod}</span>
                    </div>
                    <div className="space-y-2">
                      {cart.map(item => {
                        const effectivePrice = item.price * (1 - (item.appliedDiscountPercentage || 0) / 100);
                        return (
                          <div key={item.id} className="flex justify-between text-sm items-center">
                            <span className="text-slate-600 flex items-center gap-1.5">
                              {item.name} x {item.cartQuantity}
                              {item.appliedDiscountPercentage ? (
                                <span className="text-[10px] text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded font-black">
                                  خصم {item.appliedDiscountPercentage}%
                                </span>
                              ) : null}
                            </span>
                            <span className="font-bold text-slate-900">${(effectivePrice * item.cartQuantity).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <span className="text-lg font-bold text-slate-900">الإجمالي:</span>
                      <span className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                    >
                      رجوع
                    </button>
                    <button 
                      onClick={completeOrder}
                      className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                    >
                      تأكيد الطلب والدفع
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {view === 'invoice' && (
          <motion.div 
            key="invoice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto space-y-8 print:m-0 print:max-w-none"
            >
              <div className="flex items-center justify-between print:hidden">
                <h2 className="text-3xl font-bold text-slate-900">فاتورة الطلب</h2>
                <div className="flex gap-3">
                  <button 
                    onClick={printInvoice}
                    className="bg-slate-50 text-slate-900 px-6 py-3 rounded-xl font-bold border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-2"
                  >
                    <Printer className="w-5 h-5" /> طباعة
                  </button>
                  <button 
                    onClick={() => setView('shop')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                  >
                    العودة للمتجر
                  </button>
                </div>
              </div>

              <div className="modern-card p-12 space-y-12 bg-white shadow-xl border-slate-100 print:shadow-none print:border-none print:p-0 print-area">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">متجري <span className="text-indigo-600">الذكي</span></h1>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>حمص،  الجمهورية العربية السورية </p>
                    <p>الرقم الضريبي: 123456789</p>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-4xl font-bold text-slate-900 uppercase opacity-10 mb-4">Invoice</h3>
                  <div className="space-y-1 text-sm">
                    <p className="font-bold text-slate-900">رقم الفاتورة: <span className="text-indigo-600">{lastOrder?.id}</span></p>
                    <p className="text-slate-500">التاريخ: {lastOrder?.date}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">فاتورة إلى:</h4>
                  <div className="text-slate-900">
                    <p className="font-bold">{lastOrder?.customerName}</p>
                    <p className="text-sm text-slate-500">{lastOrder?.shippingAddress?.street}</p>
                    <p className="text-sm text-slate-500">{lastOrder?.shippingAddress?.city}، {lastOrder?.shippingAddress?.country}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">طريقة الدفع:</h4>
                  <p className="font-bold text-slate-900 uppercase">{lastOrder?.paymentMethod}</p>
                </div>
              </div>

              <table className="w-full text-right">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="py-4 font-bold text-slate-900">المنتج</th>
                    <th className="py-4 font-bold text-slate-900 text-center">الكمية</th>
                    <th className="py-4 font-bold text-slate-900">السعر</th>
                    <th className="py-4 font-bold text-slate-900 text-left">الإجمالي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lastOrder?.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-4 font-medium text-slate-900">{item.name}</td>
                      <td className="py-4 text-center text-slate-600">{item.quantity}</td>
                      <td className="py-4 text-slate-600">${item.price}</td>
                      <td className="py-4 text-left font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-8 pb-2 text-slate-500">المجموع الفرعي</td>
                    <td className="pt-8 pb-2 text-left font-bold text-slate-900">${lastOrder?.total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="py-2 text-slate-500">الضريبة (15%)</td>
                    <td className="py-2 text-left font-bold text-slate-900">$0.00</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td colSpan={3} className="py-4 text-lg font-bold text-slate-900">الإجمالي الكلي</td>
                    <td className="py-4 text-left text-2xl font-bold text-indigo-600">${lastOrder?.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>

              <div className="pt-12 border-t border-slate-100 text-center space-y-2">
                <p className="text-sm font-bold text-slate-900">شكراً لتسوقكم معنا!</p>
                <p className="text-xs text-slate-400">إذا كان لديك أي استفسار حول هذه الفاتورة، يرجى الاتصال بالدعم الفني.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}> */}
          {view === 'admin' && (
            <AdminPanel 
              adminSubView={adminSubView}
              setAdminSubView={setAdminSubView}
              setIsAddProductModalOpen={setIsAddProductModalOpen}
              setIsAddOrderModalOpen={setIsAddOrderModalOpen}
              setIsAddCustomerModalOpen={setIsAddCustomerModalOpen}
              setIsAddVendorModalOpen={setIsAddVendorModalOpen}
              products={products}
              editingPriceId={editingPriceId}
              setEditingPriceId={setEditingPriceId}
              tempPrice={tempPrice}
              setTempPrice={setTempPrice}
              updateProductPrice={updateProductPrice}
              deleteProduct={deleteProduct}
              orders={orders}
              updateOrderStatus={updateOrderStatus}
              setLastOrder={setLastOrder}
              setView={setView}
              salesData={salesData}
              categoryData={categoryData}
              vendors={vendors}
              customers={customers}
              CATEGORIES={CATEGORIES}
              setEditingProduct={setEditingProduct}
              setNewProduct={setNewProduct}
              setEditingOrder={setEditingOrder}
              setEditingCustomer={setEditingCustomer}
              setEditingVendor={setEditingVendor}
              deleteVendor={deleteVendor}
              deleteCustomer={deleteCustomer}
              theme="light"
              heroImages={heroImages}
              addHeroImage={addHeroImage}
              removeHeroImage={removeHeroImage}
              updateHeroImage={updateHeroImage}
              inventoryPredictions={inventoryPredictions}
              deals={deals}
              addDeal={addDeal}
              deleteDeal={deleteDeal}
              updateDeal={updateDeal}
            />

          )}

          {view === 'auth' && (
            <AuthView 
              authMode={authMode}
              setAuthMode={setAuthMode}
              authForm={authForm}
              setAuthForm={setAuthForm}
              authError={authError}
              handleAuth={handleAuth}
            />
          )}

          {view === 'profile' && currentUser && (
            <ProfileView 
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              handleLogout={handleLogout}
              userOrders={userOrders}
              updateProfile={updateProfile}
              setLastOrder={setLastOrder}
              setView={setView}
            />
          )}

          {view === 'deals' && (
            <motion.div
              key="deals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 text-right"
            >
              {/* Header */}
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="px-4 py-1.5 bg-rose-50 border border-rose-100 rounded-full text-xs font-bold text-rose-600 inline-block">
                  تخفيضات وعروض حصرية 🏷️
                </span>
                <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">العروض الكبرى والتخفيضات النشطة</h2>
                <p className="text-sm text-slate-500">
                  استكشف باقات التوفير وأقوى عروض الخصومات على كافة المنتجات، يمكنك استخدام كوبونات الخصم مباشرة عند الدفع!
                </p>
              </div>

              {/* Grid of Deals */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {deals.filter(d => d.isActive).map(deal => (
                  <motion.div
                    key={deal.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-100/40 flex flex-col justify-between"
                  >
                    <div>
                      {deal.image && (
                        <div className="h-56 relative overflow-hidden bg-slate-100">
                          <img 
                            src={deal.image} 
                            alt={deal.title} 
                            className="w-full h-full object-cover" 
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 right-4 bg-rose-600 text-white font-black text-sm px-4 py-2 rounded-2xl shadow-lg">
                            خصم {deal.discountPercentage}%
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6 space-y-3 text-right">
                        <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{deal.title}</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{deal.description}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-50 border-t border-slate-100/80 flex flex-col gap-3">
                      {deal.code && (
                        <div className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-2xl">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(deal.code || '');
                              setNotification({ message: `تم نسخ رمز الكوبون (${deal.code}) بنجاح!`, type: 'success' });
                              setTimeout(() => setNotification(null), 3000);
                            }}
                            className="text-indigo-600 hover:text-indigo-700 font-bold text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl transition-all"
                          >
                            نسخ الكود
                          </button>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-extrabold text-slate-900 text-sm tracking-wider bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                              {deal.code}
                            </span>
                            <Ticket className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      )}
                      {(() => {
                        const linkedProduct = products.find(p => p.id === deal.productId);
                        if (linkedProduct) {
                          const discountedPrice = (linkedProduct.price * (1 - deal.discountPercentage / 100)).toFixed(2);
                          return (
                            <button
                              onClick={() => {
                                setSelectedProductForDetails(linkedProduct);
                              }}
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-1.5 animate-pulse"
                            >
                              🛍️ اطلب المنتج مباشرة (${discountedPrice} <span className="line-through text-indigo-300 font-normal text-[10px]">${linkedProduct.price}</span>)
                            </button>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </motion.div>
                ))}
              </div>

              {deals.filter(d => d.isActive).length === 0 && (
                <div className="p-16 border-2 border-dashed border-slate-200 rounded-[32px] text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto">
                    <Tag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg">لا توجد عروض ترويجية نشطة حالياً</h4>
                  <p className="text-xs text-slate-500">ترقبوا إطلاق حملاتنا وتنزيلاتنا الكبرى قريباً جداً!</p>
                  <button 
                    onClick={() => setView('shop')}
                    className="text-indigo-600 hover:underline font-bold text-sm"
                  >
                    العودة للتسوق
                  </button>
                </div>
              )}
            </motion.div>
          )}

        {/* </Suspense> */}

      </AnimatePresence>
      </main>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddProductModalOpen(false);
                setEditingProduct(null);
                setNewProduct({
                  name: '',
                  price: 0,
                  category: 'electronics',
                  image: 'https://picsum.photos/seed/new/400/400',
                  images: [],
                  rating: 5,
                  reviewsCount: 0,
                  quantity: 10,
                  description: ''
                });
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddProductModalOpen(false);
                      setEditingProduct(null);
                      setNewProduct({
                        name: '',
                        price: 0,
                        category: 'electronics',
                        image: 'https://picsum.photos/seed/new/400/400',
                        images: [],
                        rating: 5,
                        reviewsCount: 0,
                        quantity: 10,
                        description: ''
                      });
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم المنتج</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      placeholder="أدخل اسم المنتج"
                      value={newProduct.name}
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">صورة المنتج</label>
                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer relative group">
                      {newProduct.image ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                          <img 
                            src={newProduct.image} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold">تغيير الصورة</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-4">
                          <div className="p-3 bg-slate-50 border border-slate-100 rounded-full mb-2">
                            <Upload className="w-6 h-6 text-indigo-600" />
                          </div>
                          <span className="text-sm text-slate-500">اضغط لرفع صورة المنتج</span>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">معرض صور المنتج (اختياري)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(newProduct.images || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                          <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          <button 
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <div className="relative aspect-square border-2 border-dashed border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer">
                        <Plus className="w-6 h-6 text-slate-400" />
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                          onChange={handleGalleryUpload}
                        />
                      </div>
                    </div>
                  </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">السعر ($)</label>
                        <input 
                          type="number" 
                          className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                          placeholder="0.00"
                          value={newProduct.price || ''}
                          onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900">الكمية</label>
                        <input 
                          type="number" 
                          className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                          placeholder="10"
                          value={newProduct.quantity || ''}
                          onChange={e => setNewProduct({...newProduct, quantity: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">التصنيف</label>
                    <select 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      value={newProduct.category}
                      onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}
                    >
                      {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.parentId ? `  -- ${cat.name}` : cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">وصف المنتج</label>
                    <textarea 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all min-h-[100px]"
                      placeholder="أدخل وصف المنتج هنا..."
                      value={newProduct.description}
                      onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  onClick={addProduct}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  {editingProduct ? 'تحديث المنتج' : 'إضافة المنتج للمتجر'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddOrderModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddOrderModalOpen(false);
                setEditingOrder(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingOrder ? 'تعديل الطلب' : 'إضافة طلب جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddOrderModalOpen(false);
                      setEditingOrder(null);
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const orderData = {
                    id: editingOrder?.id || `ORD-${Math.floor(Math.random() * 10000)}`,
                    customerName: formData.get('customerName') as string,
                    customerId: editingOrder?.customerId || `CUST-${Math.floor(Math.random() * 1000)}`,
                    total: parseFloat(formData.get('total') as string),
                    status: formData.get('status') as any,
                    date: formData.get('date') as string,
                    items: editingOrder?.items || [],
                    trackingNumber: formData.get('trackingNumber') as string
                  };
                  if (editingOrder) {
                    updateOrder(editingOrder.id, orderData);
                  } else {
                    addOrder(orderData as Order);
                  }
                }}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم العميل</label>
                    <input 
                      name="customerName"
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingOrder?.customerName}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">المجموع ($)</label>
                      <input 
                        name="total"
                        type="number" 
                        required
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingOrder?.total}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">التاريخ</label>
                      <input 
                        name="date"
                        type="date" 
                        required
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingOrder?.date || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">الحالة</label>
                    <select 
                      name="status"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingOrder?.status || 'pending'}
                    >
                      <option value="pending">معلق</option>
                      <option value="processing">قيد المعالجة</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">رقم التتبع</label>
                    <input 
                      name="trackingNumber"
                      type="text" 
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingOrder?.trackingNumber}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
                  >
                    {editingOrder ? 'تحديث الطلب' : 'إضافة الطلب'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {isAddCustomerModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddCustomerModalOpen(false);
                setEditingCustomer(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingCustomer ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddCustomerModalOpen(false);
                      setEditingCustomer(null);
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const customerData = {
                    id: editingCustomer?.id || `CUST-${Math.floor(Math.random() * 1000)}`,
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    totalOrders: parseInt(formData.get('totalOrders') as string) || 0,
                    totalSpent: parseFloat(formData.get('totalSpent') as string) || 0,
                    status: formData.get('status') as any
                  };
                  if (editingCustomer) {
                    updateCustomer(editingCustomer.id, customerData);
                  } else {
                    addCustomer(customerData as Customer);
                  }
                }}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم العميل</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingCustomer?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">البريد الإلكتروني</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingCustomer?.email}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">عدد الطلبات</label>
                      <input 
                        name="totalOrders"
                        type="number" 
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingCustomer?.totalOrders}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">إجمالي الإنفاق ($)</label>
                      <input 
                        name="totalSpent"
                        type="number" 
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingCustomer?.totalSpent}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">الحالة</label>
                    <select 
                      name="status"
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingCustomer?.status || 'active'}
                    >
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
                  >
                    {editingCustomer ? 'تحديث بيانات العميل' : 'إضافة العميل'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {isAddVendorModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsAddVendorModalOpen(false);
                setEditingVendor(null);
              }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{editingVendor ? 'تعديل بيانات البائع' : 'إضافة بائع جديد'}</h3>
                  <button 
                    onClick={() => {
                      setIsAddVendorModalOpen(false);
                      setEditingVendor(null);
                    }} 
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const vendorData = {
                    id: editingVendor?.id || `VEND-${Math.floor(Math.random() * 1000)}`,
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    category: formData.get('category') as string,
                    sales: parseFloat(formData.get('sales') as string) || 0,
                    status: formData.get('status') as any,
                    rating: parseFloat(formData.get('rating') as string) || 5
                  };
                  if (editingVendor) {
                    updateVendor(editingVendor.id, vendorData);
                  } else {
                    addVendor(vendorData as Vendor);
                  }
                }}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">اسم البائع</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingVendor?.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900">البريد الإلكتروني</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                      defaultValue={editingVendor?.email}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">التصنيف</label>
                      <input 
                        name="category"
                        type="text" 
                        required
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.category}
                        placeholder="إلكترونيات، أزياء..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">المبيعات ($)</label>
                      <input 
                        name="sales"
                        type="number" 
                        step="0.01"
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.sales}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">التقييم</label>
                      <input 
                        name="rating"
                        type="number" 
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.rating || 5}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900">الحالة</label>
                      <select 
                        name="status"
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-100 text-slate-900 transition-all"
                        defaultValue={editingVendor?.status || 'active'}
                      >
                        <option value="active">نشط</option>
                        <option value="inactive">غير نشط</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all mt-4"
                  >
                    {editingVendor ? 'تحديث البائع' : 'إضافة البائع'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {selectedProductForDetails && (
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProductForDetails(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-5xl bg-blue-50 rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
              >
                <button 
                  onClick={() => setSelectedProductForDetails(null)}
                  className="absolute top-6 right-6 z-20 p-3 bg-blue-50/80 backdrop-blur-sm hover:bg-blue-100 rounded-full shadow-lg transition-all"
                >
                  <X className="w-6 h-6 text-slate-900" />
                </button>

                {/* Left: Image Gallery */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-auto bg-blue-50 relative group">
                  <ProductGallery images={[selectedProductForDetails.image, ...(selectedProductForDetails.images || [])]} />
                </div>

                {/* Right: Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar">
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                          {CATEGORIES.find(c => c.id === selectedProductForDetails.category)?.name}
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-bold text-amber-700">{selectedProductForDetails.rating}</span>
                          </div>
                          {currentUser && (
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onMouseEnter={() => setUserRating(star)}
                                  onMouseLeave={() => setUserRating(0)}
                                  onClick={() => handleRateProduct(selectedProductForDetails.id, star)}
                                  className="p-0.5 transition-transform hover:scale-125"
                                >
                                  <Star 
                                    className={`w-4 h-4 ${
                                      (userRating || 0) >= star 
                                        ? 'text-amber-400 fill-amber-400' 
                                        : 'text-slate-300'
                                    }`} 
                                  />
                                </button>
                              ))}
                              <span className="text-[10px] font-bold text-slate-400 mr-1">قيم الآن</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-2">
                        {selectedProductForDetails.name}
                      </h2>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-indigo-600">${selectedProductForDetails.price}</span>
                        <span className="text-sm text-slate-400">شامل الضريبة</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">وصف المنتج</h4>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {selectedProductForDetails.description || "لا يوجد وصف متوفر لهذا المنتج حالياً. يتميز هذا المنتج بجودة عالية وتصميم عصري يناسب جميع الأذواق."}
                      </p>
                    </div>

                    {/* Discount Coupons Area for user coupons usage */}
                    {(() => {
                      const productDeals = deals.filter(d => d.isActive && d.productId === selectedProductForDetails.id);
                      const generalDeals = deals.filter(d => d.isActive && (!d.productId || d.productId === ''));
                      const hasSpecificDeal = productDeals.length > 0;
                      const activeDealsToShow = hasSpecificDeal ? productDeals : generalDeals.slice(0, 1);

                      if (activeDealsToShow.length === 0) return null;

                      return (
                        <div className="p-5 bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-100 rounded-3xl space-y-3.5 text-right shadow-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black text-rose-600 bg-rose-100/60 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                              ⚡ {hasSpecificDeal ? 'عرض خصم حصري للمنتج' : 'كوبون خصم إضافي متاح للمتجر'}
                            </span>
                            <span className="text-xs text-slate-500 font-bold">الحملات الترويجية</span>
                          </div>

                          {activeDealsToShow.map(deal => {
                            const discountedPrice = (selectedProductForDetails.price * (1 - deal.discountPercentage / 100)).toFixed(2);
                            return (
                              <div key={deal.id} className="space-y-3">
                                <div className="space-y-1">
                                  <h5 className="font-extrabold text-slate-900 text-sm">{deal.title}</h5>
                                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{deal.description}</p>
                                </div>

                                {deal.code && (
                                  <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between pt-2.5 border-t border-rose-100/50 mt-2">
                                    <div className="flex items-center gap-2 justify-end">
                                      <span className="text-[11px] text-slate-400 font-bold">جرب الكود:</span>
                                      <span className="font-mono bg-white border border-rose-200 px-2.5 py-1 rounded-xl text-xs font-black text-rose-600 shadow-sm select-all">
                                        {deal.code}
                                      </span>
                                    </div>
                                    
                                    <div className="flex gap-2 justify-end">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          navigator.clipboard.writeText(deal.code || '');
                                          setNotification({ message: `تم نسخ الكوبون (${deal.code}) بنجاح!`, type: 'success' });
                                          setTimeout(() => setNotification(null), 3000);
                                        }}
                                        className="bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-bold text-xs px-3 py-2 rounded-xl transition-all border border-slate-200 shadow-sm"
                                      >
                                        📋 نسخ الكود
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => {
                                          addToCart(selectedProductForDetails, deal.discountPercentage, deal.code);
                                          setSelectedProductForDetails(null);
                                          setIsCartOpen(true);
                                        }}
                                        className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl transition-all shadow-md shadow-rose-100"
                                      >
                                        🛍️ تفعيل وشراء مباشرة (${discountedPrice})
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs text-slate-400 mb-1">حالة المخزون</p>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${selectedProductForDetails.quantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {selectedProductForDetails.quantity > 0 ? `متوفر (${selectedProductForDetails.quantity})` : 'نفذت الكمية'}
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-xs text-slate-400 mb-1">التقييمات</p>
                        <p className="font-bold text-slate-900">{selectedProductForDetails.reviewsCount || 0} مراجعة</p>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => {
                          addToCart(selectedProductForDetails);
                          setSelectedProductForDetails(null);
                        }}
                        disabled={selectedProductForDetails.quantity === 0}
                        className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-6 h-6" />
                        إضافة للسلة
                      </button>
                      <button className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                        <Heart className="w-6 h-6" />
                        المفضلة
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </AnimatePresence>

      {/* Modern Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-blue-50 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">المفضلة</h2>
                </div>
                <button onClick={() => setIsWishlistOpen(false)} className="p-2 hover:bg-blue-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-slate-300">
                      <Heart className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">قائمة المفضلة فارغة</p>
                      <p className="text-sm text-slate-500">أضف بعض المنتجات التي تحبها لتجدها هنا لاحقاً</p>
                    </div>
                  </div>
                ) : (
                  wishlist.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100 hover:border-red-100 transition-colors group relative">
                      <img src={item.image} className="w-20 h-20 rounded-xl object-cover border border-slate-100" alt="" />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                            <p className="text-xs font-bold text-indigo-600 mt-0.5">${item.price}</p>
                          </div>
                          <button onClick={() => toggleWishlist(item)} className="text-red-500 hover:text-red-700 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <button 
                            onClick={() => {
                              addToCart(item);
                              setIsWishlistOpen(false);
                            }}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" /> إضافة للسلة
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedProductForDetails(item);
                              setIsWishlistOpen(false);
                            }}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600"
                          >
                            عرض التفاصيل
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-blue-50 z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-indigo-600">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">سلة التسوق</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-blue-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">السلة فارغة</p>
                      <p className="text-sm text-slate-500">ابدأ بإضافة بعض المنتجات الرائعة</p>
                    </div>
                  </div>
                ) : (
                  cart.map(item => {
                    const hasDiscount = !!item.appliedDiscountPercentage;
                    const effectivePrice = item.price * (1 - (item.appliedDiscountPercentage || 0) / 100);
                    return (
                      <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-slate-100/80 hover:border-indigo-100 bg-white transition-all group shadow-sm">
                        <img src={item.image} className="w-20 h-20 rounded-xl object-cover border border-slate-100" alt="" />
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="text-right">
                              <h4 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                              {hasDiscount ? (
                                <div className="mt-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-extrabold text-indigo-600">${effectivePrice.toFixed(2)}</span>
                                    <span className="text-[10px] text-slate-400 line-through">${item.price}</span>
                                  </div>
                                  <span className="inline-block text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md mt-1">
                                    خصم {item.appliedDiscountPercentage}% {item.promoCode ? `(رمز: ${item.promoCode})` : ''}
                                  </span>
                                </div>
                              ) : (
                                <p className="text-xs font-bold text-indigo-600 mt-0.5">${item.price}</p>
                              )}
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-blue-50 border border-blue-100 rounded-lg px-1.5 py-1">
                              <button onClick={() => updateCartQuantity(item.id, -1)} className="p-1 text-slate-400 hover:text-indigo-600"><Minus className="w-3 h-3" /></button>
                              <span className="w-8 text-center text-xs font-bold text-slate-900">{item.cartQuantity}</span>
                              <button onClick={() => updateCartQuantity(item.id, 1)} className="p-1 text-slate-400 hover:text-indigo-600"><Plus className="w-3 h-3" /></button>
                            </div>
                            <span className="font-bold text-slate-900">${(effectivePrice * item.cartQuantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-blue-100 bg-blue-50 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>المجموع الفرعي</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>الشحن</span>
                      <span className="text-green-600 font-bold">مجاني</span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                      <span className="font-bold text-slate-900">المجموع الكلي</span>
                      <span className="text-2xl font-bold text-indigo-600">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    إتمام الدفع <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modern Minimal Footer */}
      <footer className="bg-blue-50 border-t border-blue-200 pt-16 pb-8 px-6 no-print">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">متجري <span className="text-indigo-600">الذكي</span></h1>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                نحن نعيد تعريف تجربة التسوق عبر الإنترنت من خلال توفير منتجات عالية الجودة بواجهة مستخدم بسيطة وذكية.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-blue-100 hover:text-indigo-600 transition-all cursor-pointer">
                    <Star className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-slate-900">روابط سريعة</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><button onClick={goHome} className="hover:text-indigo-600 transition-colors">الرئيسية</button></li>
                <li><button onClick={() => { setView('shop'); setTimeout(() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-indigo-600 transition-colors">المنتجات</button></li>
                <li><button onClick={() => { setView('shop'); setPriceRange([0, 100]); }} className="hover:text-indigo-600 transition-colors">العروض</button></li>
                <li><button className="hover:text-indigo-600 transition-colors">من نحن</button></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-slate-900">الدعم الفني</h5>
              <ul className="space-y-2 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">تتبع الطلب</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">سياسة الاسترجاع</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
            <p>© 2026 MATJARI SMART. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-slate-900 transition-colors">شروط الخدمة</a>
            </div>
          </div>
        </div>
      </footer>

      <AIChatBot 
        products={products}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
        messages={chatMessages}
        setMessages={setChatMessages}
        isLoading={isChatLoading}
        setIsLoading={setIsChatLoading}
        onAddToCart={addToCart}
      />

      {isPaypalModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 flex flex-col text-right"
          >
            {/* Header */}
            <div className="bg-[#003087] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-2xl font-black italic tracking-tighter text-[#0079C1] bg-white px-3 py-1 rounded-lg">
                  PayPal
                </div>
              </div>
              <button 
                onClick={() => setIsPaypalModalOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setIsPaypalAuthorizing(true);
                // Simulate communication with PayPal
                setTimeout(() => {
                  setIsPaypalAuthorizing(false);
                  setIsPaypalAuthorized(true);
                  setIsPaypalModalOpen(false);
                  setCheckoutStep(3); // Advance automatically!
                  setNotification({ message: 'تم تسجيل الدخول وتفويض الدفع لـ PayPal بنجاح', type: 'success' });
                  setTimeout(() => setNotification(null), 3000);
                }, 2000);
              }} 
              className="p-8 space-y-6"
            >
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold text-slate-900">تسجيل الدخول للتفويض بالدفع</h3>
                <p className="text-xs text-slate-500">قم بتسجيل الدخول الآمن لتفويض عملية الدفع لطلبك الحالي بقيمة ${cartTotal.toFixed(2)}</p>
              </div>

              {isPaypalAuthorizing ? (
                <div className="py-8 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-bold text-slate-600 animate-pulse">جاري الاتصال بـ PayPal للتحقق من هويتك...</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-right">البريد الإلكتروني لحساب PayPal</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all text-left"
                      placeholder="paypal@example.com"
                      value={paypalEmail}
                      onChange={e => setPaypalEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-right">كلمة المرور الخاصة بـ PayPal</label>
                    <input 
                      type="password" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-100 text-slate-900 transition-all text-left"
                      placeholder="••••••••"
                      value={paypalPassword}
                      onChange={e => setPaypalPassword(e.target.value)}
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-[#0079C1] text-white py-4 rounded-xl font-bold hover:bg-[#00457C] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-100"
                    >
                      تسجيل الدخول والتفويض بالدفع
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsPaypalModalOpen(false)}
                      className="w-full text-slate-400 hover:text-slate-600 font-bold text-sm py-3 mt-2 transition-all"
                    >
                      إلغاء والعودة لخطوات الدفع
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
}
