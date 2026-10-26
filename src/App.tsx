import React, { useState, useEffect } from 'react';
import { Product, OrderItem, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { MagazineBackground } from './components/MagazineBackground';
import { MagazineWelcome } from './components/MagazineWelcome';
import { LoadingScreen } from './components/LoadingScreen';
import { Masthead } from './components/Masthead';
import { HomeCoverSection } from './components/HomeCoverSection';
import { CatalogSection } from './components/CatalogSection';
import { FavoritesSection } from './components/FavoritesSection';
import { OrdersSection } from './components/OrdersSection';
import { TabBar, TabType } from './components/TabBar';
import { ProductSheet } from './components/ProductSheet';
import { ContactSheet } from './components/ContactSheet';
import { ReviewsSheet } from './components/ReviewsSheet';
import { FaqSheet } from './components/FaqSheet';
import { SnkSheet } from './components/SnkSheet';
import { InfoSheet } from './components/InfoSheet';
import { PrivacySheet } from './components/PrivacySheet';
import { CartDrawer } from './components/CartDrawer';
import { InvoiceModal } from './components/InvoiceModal';
import { ToastContainer, ToastData } from './components/Toast';
import { ShoppingCart, MessageSquare } from 'lucide-react';
import { ADMIN_WHATSAPP } from './data/products';

export default function App() {
  // Screen Loading State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Magazine Entrance Screen State (starts on cover page)
  const [entered, setEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [catalogInitialQuery, setCatalogInitialQuery] = useState<string>('');

  // Theme State: 'dark' (Brutalist Zine) vs 'light' (Newsprint Paper)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const stored = localStorage.getItem('regarm_theme');
      return stored === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('regarm_theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sheet Drawer States
  const [activeSheet, setActiveSheet] = useState<
    'product' | 'contact' | 'reviews' | 'faq' | 'snk' | 'info' | 'privacy' | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<OrderItem | null>(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState<boolean>(false);

  // Persistence: Favorites & Orders
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('rm-favs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const stored = localStorage.getItem('regarm_orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Shopping Cart Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('regarm_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('regarm_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Non-blocking Toasts
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('rm-favs', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      showToast(exists ? 'Dihapus dari Favorit' : 'Ditambahkan ke Favorit ★', 'info');
      return next;
    });
  };

  const handleToggleFavoriteFromCard = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    toggleFavorite(productId);
  };

  const handleOrderPlaced = (order: OrderItem) => {
    setOrders((prev) => {
      const updated = [order, ...prev.filter((o) => o.id !== order.id)].slice(0, 30);
      try {
        localStorage.setItem('regarm_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleClearOrders = () => {
    if (confirm('Bersihkan riwayat pesanan di perangkat ini?')) {
      localStorage.removeItem('regarm_orders');
      setOrders([]);
      showToast('Riwayat pesanan dibersihkan', 'info');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveSheet('product');
  };

  const handleCloseSheet = () => {
    setActiveSheet(null);
  };

  const handleOpenInvoiceFromSheet = (order: OrderItem) => {
    setActiveSheet(null);
    setSelectedInvoice(order);
    setIsInvoiceOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].q += item.q;
        return updated;
      }
      return [...prev, item];
    });
    showToast(`${item.app} (${item.nama}) masuk keranjang 🛒`, 'success');
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, q: newQty } : item)));
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item dihapus dari keranjang', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('regarm_cart');
    showToast('Keranjang telah dikosongkan', 'info');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isCartOpen) setIsCartOpen(false);
        if (activeSheet) setActiveSheet(null);
        if (isInvoiceOpen) setIsInvoiceOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSheet, isInvoiceOpen, isCartOpen]);

  // Initial Boot Loading Screen
  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <main
      className="relative min-h-screen overflow-x-hidden transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--fg)'
      }}
    >
      {/* Dynamic Background with Technical Grid, Ambient Glows, Halftone, and ZAY Watermark */}
      <MagazineBackground />

      {/* Film grain texture */}
      <div className="grain" aria-hidden="true" />

      {/* Non-blocking Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Welcome Cover Issue Screen (Magazine Entrance) */}
      {!entered ? (
        <MagazineWelcome onEnter={() => setEntered(true)} />
      ) : (
        <div className="relative mx-auto w-full max-w-md pb-24 z-10">
          {/* Masthead */}
          <Masthead
            theme={theme}
            onToggleTheme={toggleTheme}
            onGoHome={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCover={() => setEntered(false)}
            onOpenInfo={() => setActiveSheet('info')}
          />

          {/* Main Tab Pages */}
          {activeTab === 'home' && (
            <HomeCoverSection
              products={PRODUCTS}
              favorites={favorites}
              favoritesCount={favorites.length}
              ordersCount={orders.length}
              cartCount={cart.reduce((a, b) => a + b.q, 0)}
              theme={theme}
              onToggleTheme={toggleTheme}
              onGoToCatalog={(query) => {
                if (query) setCatalogInitialQuery(query);
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToFavorites={() => {
                setActiveTab('favs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToOrders={() => {
                setActiveTab('orders');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenContact={() => setActiveSheet('contact')}
              onOpenReviews={() => setActiveSheet('reviews')}
              onOpenFaq={() => setActiveSheet('faq')}
              onOpenSnk={() => setActiveSheet('snk')}
              onOpenInfo={() => setActiveSheet('info')}
              onOpenPrivacy={() => setActiveSheet('privacy')}
              onSelectProduct={handleSelectProduct}
              onToggleFavorite={handleToggleFavoriteFromCard}
            />
          )}

          {activeTab === 'catalog' && (
            <CatalogSection
              products={PRODUCTS}
              favorites={favorites}
              initialQuery={catalogInitialQuery}
              onSelectProduct={handleSelectProduct}
              onToggleFavorite={handleToggleFavoriteFromCard}
            />
          )}

          {activeTab === 'favs' && (
            <FavoritesSection
              products={PRODUCTS}
              favorites={favorites}
              onSelectProduct={handleSelectProduct}
              onToggleFavorite={handleToggleFavoriteFromCard}
              onGoToCatalog={() => {
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersSection
              orders={orders}
              onGoToCatalog={() => {
                setActiveTab('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewInvoice={(ord) => {
                setSelectedInvoice(ord);
                setIsInvoiceOpen(true);
              }}
              onClearHistory={handleClearOrders}
            />
          )}

          {/* Bottom Fixed Tab Bar */}
          <TabBar
            activeTab={activeTab}
            favoritesCount={favorites.length}
            onSelectTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* Slide-Up Bottom Sheets */}
      {activeSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 fade-in backdrop-blur-sm cursor-pointer"
            style={{ backgroundColor: 'rgba(17, 19, 23, 0.85)' }}
            onClick={handleCloseSheet}
          />

          {/* Drawer Body */}
          <div
            role="dialog"
            aria-modal="true"
            className="sheet-up relative max-h-[90vh] w-full max-w-md overflow-y-auto border-t-2 z-10 shadow-2xl"
            style={{
              borderColor: 'var(--fg)',
              backgroundColor: 'var(--popover)'
            }}
          >
            {/* Close Button Sticker */}
            <button
              onClick={handleCloseSheet}
              aria-label="Tutup"
              className="sticker absolute right-4 top-4 z-20 cursor-pointer"
              style={{ background: 'var(--fg)', color: 'var(--bg)' }}
            >
              Tutup ✕
            </button>

            {activeSheet === 'product' && selectedProduct && (
              <ProductSheet
                product={selectedProduct}
                isFavorite={favorites.includes(selectedProduct.id)}
                onClose={handleCloseSheet}
                onToggleFavorite={toggleFavorite}
                onOrderPlaced={handleOrderPlaced}
                onOpenInvoice={handleOpenInvoiceFromSheet}
                onAddToCart={handleAddToCart}
                onShowToast={showToast}
              />
            )}

            {activeSheet === 'contact' && (
              <ContactSheet onClose={handleCloseSheet} />
            )}

            {activeSheet === 'reviews' && (
              <ReviewsSheet onClose={handleCloseSheet} onShowToast={showToast} />
            )}

            {activeSheet === 'faq' && (
              <FaqSheet onClose={handleCloseSheet} />
            )}

            {activeSheet === 'snk' && (
              <SnkSheet onClose={handleCloseSheet} onShowToast={showToast} />
            )}

            {activeSheet === 'info' && (
              <InfoSheet
                onClose={handleCloseSheet}
                onOpenPrivacy={() => setActiveSheet('privacy')}
                onOpenSnk={() => setActiveSheet('snk')}
              />
            )}

            {activeSheet === 'privacy' && (
              <PrivacySheet onClose={handleCloseSheet} />
            )}
          </div>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
        onOpenInvoice={(ord) => {
          setIsCartOpen(false);
          setSelectedInvoice(ord);
          setIsInvoiceOpen(true);
        }}
      />

      {/* Floating Action Buttons: WhatsApp & Cart */}
      {entered && !isCartOpen && (
        <div className="fixed bottom-20 z-40 flex items-center justify-between w-full max-w-md left-1/2 -translate-x-1/2 px-4 pointer-events-none">
          {/* Floating WhatsApp Admin Chat */}
          <a
            href={`https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent('Halo Admin REGARM-MART, saya mau tanya-tanya akun premium dong! ⚡')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp Admin"
            className="brutal pointer-events-auto flex items-center gap-2 px-3.5 py-2.5 font-mono text-[11px] font-extrabold uppercase cursor-pointer shadow-2xl transition-transform active:scale-95"
            style={{ background: '#22d3ee', color: '#090d16' }}
          >
            <MessageSquare className="w-4 h-4 fill-current text-[#090d16]" />
            <span>Chat Admin</span>
          </a>

          {/* Floating Cart Button (when items in cart) */}
          {cart.length > 0 && (
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Buka Keranjang Belanja"
              className="brutal pointer-events-auto flex items-center gap-2 px-4 py-2.5 font-mono text-xs font-black uppercase cursor-pointer shadow-2xl transition-transform active:scale-95"
              style={{ background: 'var(--lime)', color: 'var(--ink)' }}
            >
              <ShoppingCart className="w-4 h-4 fill-current text-[#131519]" />
              <span>Keranjang ({cart.reduce((a, b) => a + b.q, 0)})</span>
            </button>
          )}
        </div>
      )}

      {/* Official Digital Invoice Modal */}
      <InvoiceModal
        order={selectedInvoice}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        onShowToast={showToast}
      />
    </main>
  );
}
