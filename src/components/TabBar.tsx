import React from 'react';

export type TabType = 'home' | 'catalog' | 'favs' | 'orders';

interface TabBarProps {
  activeTab: TabType;
  favoritesCount: number;
  onSelectTab: (tab: TabType) => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  favoritesCount,
  onSelectTab
}) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '◼' },
    { id: 'catalog', label: 'Katalog', icon: '▦' },
    { id: 'favs', label: 'Favorit', icon: '★' },
    { id: 'orders', label: 'Riwayat', icon: '↻' }
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t-2 shadow-2xl"
      style={{
        borderColor: 'var(--fg)',
        backgroundColor: 'var(--bg)'
      }}
    >
      <div className="grid grid-cols-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className="relative flex flex-col items-center justify-center gap-1 py-3 transition-colors cursor-pointer"
              style={{
                backgroundColor: isActive ? 'var(--lime)' : 'transparent',
                color: isActive ? 'var(--ink)' : 'var(--muted)'
              }}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
                {tab.label}
              </span>

              {/* Notification dot if items in favorites */}
              {tab.id === 'favs' && favoritesCount > 0 && !isActive && (
                <span
                  className="absolute right-[28%] top-2 h-2 w-2 rounded-full"
                  style={{ background: 'var(--lime)' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
