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
    <div className="min-h-screen bg-black text-white pb-24">
      <AnimatePresence mode="wait">
        {currentView === 'catalog' && (
          <CatalogView 
            onSelectProduct={setSelectedProduct} 
          />
        )}
        {currentView === 'cart' && (
          <div key="cart" className="p-6 pt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Ваш заказ</h2>
            <p className="text-white/60">Для оформления заказа перейдите в наш магазин на Авито или свяжитесь с нами.</p>
            <button 
              onClick={() => setCurrentView('catalog')}
              className="mt-6 pill-button"
            >
              Вернуться в каталог
            </button>
          </div>
        )}
        {currentView === 'profile' && (
          <div key="profile" className="p-6 pt-12 text-center">
            <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <User size={48} className="text-white/40" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ваш профиль</h2>
            <p className="text-white/60 mb-8">Войдите, чтобы отслеживать свои заказы и получать персональные предложения.</p>
            <button className="pill-button w-full justify-center">Войти</button>
          </div>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 pt-12"
    >
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          MIRA & <span className="gold-gradient">PAPA</span>
        </h1>
        <p className="text-white/60 text-sm">Эксклюзивные награды из настоящего металла</p>
      </header>

      <div className="grid gap-6">
        {PRODUCTS.map((product) => (
          <motion.div 
            key={product.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProduct(product)}
            className="product-card group relative"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-white/60 text-sm flex items-center gap-1">
                      <Weight size={14} /> {product.weight}
                    </p>
                  </div>
                  <div className="text-lg font-bold text-[#D4AF37]">{product.price}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
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
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-lg bg-[#111] rounded-t-[32px] sm:rounded-[32px] overflow-hidden relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md"
          >
            <X size={20} />
          </button>

          <div className="aspect-video relative">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-[#D4AF37]" size={20} />
              <span className="text-xs uppercase tracking-widest text-white/40 font-semibold">Premium Award</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <p className="text-white/60 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-white/40 text-xs uppercase mb-1">Вес</div>
                <div className="font-bold">{product.weight}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-white/40 text-xs uppercase mb-1">Материал</div>
                <div className="font-bold">Металл</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a 
                href={product.avitoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full pill-button justify-center py-4 text-lg"
              >
                Купить на Авито <ExternalLink size={20} />
              </a>
              <a 
                href={`https://t.me/+79779662521?text=${encodeURIComponent(`Здравствуйте! Хочу заказать: ${product.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 text-lg font-semibold rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                Купить в Telegram <MessageSquare size={20} />
              </a>
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
