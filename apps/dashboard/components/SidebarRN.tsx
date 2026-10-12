'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const CORE_ITEMS = [
  {
    title: 'Getting Started',
    links: [
      { name: 'Introduction', href: '/react-native' },
      { name: 'Installation', href: '/react-native/installation' },
    ]
  },
  {
    title: 'Wallet & Auth',
    links: [
      { name: 'useWallets', href: '/react-native/wallet/useWallets' },
      { name: 'useCreateWallet', href: '/react-native/wallet/useCreateWallet' },
      { name: 'Biometric Auth', href: '/react-native/wallet/auth-strategies' },
    ]
  },
  {
    title: 'Balances',
    links: [
      { name: 'useBalance', href: '/react-native/balances/useBalance' },
      { name: 'useBalances', href: '/react-native/balances/useBalances' },
    ]
  },
  {
    title: 'Transactions',
    links: [
      { name: 'useTransfer', href: '/react-native/transactions/useTransfer' },
      { name: 'useTransactions', href: '/react-native/transactions/useTransactions' },
      { name: 'useSwap', href: '/react-native/transactions/useSwap' },
    ]
  },
  {
    title: 'Network & Services',
    links: [
      { name: 'useTNS', href: '/react-native/network/useTNS' },
    ]
  },
];

const ADVANCED_ITEMS = [
  {
    title: 'Advanced Wallet',
    links: [
      { name: 'useKeystore', href: '/react-native/advanced-wallet/useKeystore' },
      { name: 'useVirtualWallet', href: '/react-native/advanced-wallet/useVirtualWallet' },
    ]
  },
  {
    title: 'Tokens & Contracts',
    links: [
      { name: 'useTokenBalance', href: '/react-native/tokens-contracts/useTokenBalance' },
      { name: 'useTokenExtended', href: '/react-native/tokens-contracts/useTokenExtended' },
      { name: 'useDeployer', href: '/react-native/tokens-contracts/useDeployer' },
      { name: 'useProducts', href: '/react-native/tokens-contracts/useProducts' },
    ]
  },
  {
    title: 'Blockchain Metrics',
    links: [
      { name: 'useBlockchain', href: '/react-native/network/useBlockchain' },
      { name: 'useExchangeRates', href: '/react-native/network/useExchangeRates' },
    ]
  },
  {
    title: 'Interoperability',
    links: [
      { name: 'useBridge', href: '/react-native/interoperability/useBridge' },
      { name: 'useSolana', href: '/react-native/interoperability/useSolana' },
    ]
  },
  {
    title: 'Admin & System',
    links: [
      { name: 'useRoles', href: '/react-native/admin-system/useRoles' },
      { name: 'useCurrencyAdmin', href: '/react-native/admin-system/useCurrencyAdmin' },
      { name: 'useStorage', href: '/react-native/admin-system/useStorage' },
      { name: 'useKYC', href: '/react-native/admin-system/useKYC' },
    ]
  }
];

export default function SidebarRN({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const closeDrawer = () => onClose?.();

  useEffect(() => { closeDrawer(); }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDrawer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const renderSection = (items: any[]) => (
    items.map((section) => (
      <div key={section.title} className="mb-6">
        <h2 className="text-[10px] font-semibold text-[#52525b] uppercase tracking-widest mb-2 px-2">
          {section.title}
        </h2>
        <ul className="space-y-0.5">
          {section.links.map((link: any) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-2 py-1.5 rounded text-xs transition-colors duration-100 ${
                    active
                      ? 'bg-[#1a1a1a] text-white font-medium'
                      : 'text-[#a1a1aa] hover:text-white hover:bg-[#0a0a0a]'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ))
  );

  const sidebarContent = (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain custom-scrollbar">
      <div className="flex items-center justify-between px-4 pt-4 pb-2 md:hidden">
        <span className="text-xs font-medium text-[#16A34A]">Navigation</span>
        <button onClick={closeDrawer} className="text-[#a1a1aa] hover:text-white p-1 rounded" aria-label="Close menu">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="px-4 py-5">
        <nav>
          <div className="mb-2 px-2 pb-2 border-b border-[#1f1f1f]">
            <span className="text-xs font-medium text-[#16A34A]">Core SDK</span>
          </div>
          {renderSection(CORE_ITEMS)}
          <div className="mb-2 px-2 pb-2 mt-4 border-b border-[#1f1f1f]">
            <span className="text-xs font-medium text-[#16A34A]">Advanced APIs</span>
          </div>
          {renderSection(ADVANCED_ITEMS)}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-60 flex-shrink-0 pt-10 border-r border-[#1f1f1f] bg-black h-full hidden md:flex flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 md:hidden" onClick={closeDrawer} aria-hidden />
      )}

      {/* Mobile drawer */}
      {isOpen && (
        <aside
          className="fixed inset-y-0 left-0 z-[60] h-[100dvh] w-[min(18rem,calc(100vw-3rem))] overflow-hidden border-r border-[#1f1f1f] bg-black shadow-2xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Documentation navigation"
        >
          <div className="h-full">{sidebarContent}</div>
        </aside>
      )}
    </>
  );
}
