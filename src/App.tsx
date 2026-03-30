import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MessageSquare,
  User, 
  Home, 
  ChevronRight, 
  ExternalLink, 
  Weight, 
  Award,
  X
} from 'lucide-react';
import { Product, View } from './types';
import { PRODUCTS } from './constants';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="atmosphere" />
      
      <AnimatePresence mode="wait">
        {currentView === 'catalog' && (
          <CatalogView 
            onSelectProduct={setSelectedProduct} 
          />
        )}
        {currentView === 'cart' && (
          <motion.div 
            key="cart" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 pt-20 text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full mx-auto mb-8 flex items-center justify-center border border-white/10">
              <ShoppingBag size={32} className="text-white/40" />
            </div>
            <h2 className="section-title mb-4">Ваш заказ</h2>
            <p className="text-white/50 leading-relaxed mb-10">
              Для оформления заказа перейдите в наш магазин на Авито или свяжитесь с нами напрямую через Telegram.
            </p>
            <button 
              onClick={() => setCurrentView('catalog')}
              className="pill-button w-full"
            >
              Вернуться в каталог
            </button>
          </motion.div>
        )}
        {currentView === 'profile' && (
          <motion.div 
            key="profile" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-8 pt-20 text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full mx-auto mb-8 flex items-center justify-center border border-white/10 shadow-2xl">
              <User size={48} className="text-white/20" />
            </div>
            <h2 className="section-title mb-4">Ваш профиль</h2>
            <p className="text-white/50 leading-relaxed mb-10">
              Войдите, чтобы отслеживать свои заказы и получать персональные предложения от MIRA & PAPA.
            </p>
            <button className="pill-button w-full">Войти в аккаунт</button>
          </motion.div>
        )}
      </AnimatePresence>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      <BottomNav 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
    </div>
  );
}

function CatalogView({ onSelectProduct }: { onSelectProduct: (p: Product) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col justify-end p-8 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=2070" 
            alt="Hero"
            className="w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="small-caps mb-4 block">Эксклюзивная коллекция</span>
            <h1 className="section-title mb-6">
              MIRA & <span className="gold-gradient font-bold">PAPA</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-sm">
              Премиальные награды из настоящего металла для тех, кто ценит достижения.
            </p>
            <div className="flex gap-4">
              <button className="h-12 px-6 rounded-full bg-white text-black font-semibold text-sm">
                Смотреть все
              </button>
              <button className="h-12 px-6 rounded-full border border-white/20 font-semibold text-sm backdrop-blur-md">
                О нас
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="p-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="small-caps">Каталог</span>
            <h2 className="text-2xl font-light serif italic">Наши работы</h2>
          </div>
          <div className="text-white/40 text-xs uppercase tracking-widest font-semibold">
            {PRODUCTS.length} товаров
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProduct(product)}
              className="product-card group relative cursor-pointer"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                      Бестселлер
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
                        <Weight size={12} /> {product.weight}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#D4AF37] bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                      {product.price}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full max-w-2xl bg-[#0A0A0A] rounded-t-[40px] sm:rounded-[40px] overflow-hidden relative border-t border-white/10 sm:border"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-xl border border-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:bg-gradient-to-r" />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="small-caps !text-[#D4AF37]">Premium Quality</span>
              </div>
              
              <h2 className="section-title !text-3xl mb-6">{product.name}</h2>
              
              <p className="text-white/50 leading-relaxed mb-8 text-sm">
                {product.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="small-caps !text-[10px] mb-1">Вес изделия</div>
                  <div className="font-bold text-lg">{product.weight}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="small-caps !text-[10px] mb-1">Материал</div>
                  <div className="font-bold text-lg">Металл</div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a 
                  href={product.avitoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button group"
                >
                  Заказать на Авито 
                  <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a 
                  href={`https://t.me/+79779662521?text=${encodeURIComponent(`Здравствуйте! Хочу заказать: ${product.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-4 text-sm font-bold rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  Написать в Telegram <MessageSquare size={18} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function BottomNav({ currentView, onViewChange }: { currentView: View, onViewChange: (v: View) => void }) {
  const items: { id: View; icon: React.ReactNode; label: string }[] = [
    { id: 'catalog', icon: <Home size={24} />, label: 'Главная' },
    { id: 'cart', icon: <ShoppingBag size={24} />, label: 'Заказы' },
    { id: 'profile', icon: <User size={24} />, label: 'Профиль' },
  ];

  return (
    <nav className="bottom-nav">
      {items.map(item => (
        <button 
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`nav-item ${currentView === item.id ? 'active' : ''}`}
        >
          {item.icon}
          <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
