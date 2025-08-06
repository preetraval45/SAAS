import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Globe, 
  Settings, 
  User,
  LogOut,
  Menu as MenuIcon,
  X,
  BarChart3,
  FileText,
  HelpCircle,
  UserCircle,
  TestTube,
  Shield,
  ExternalLink
} from 'lucide-react';

export default function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['SuperUser', 'Admin', 'User', 'Manager', 'Operator', 'ITRA', 'Guest'] },
      { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['SuperUser', 'Admin', 'Manager'] },
      { name: 'Reports', href: '/reports', icon: FileText, roles: ['SuperUser', 'Admin', 'Manager'] },
      { name: 'Websites', href: '/websites', icon: Globe, roles: ['SuperUser', 'Admin', 'User', 'Manager', 'Operator'] },
      { name: 'Simulations', href: '/simulations', icon: TestTube, roles: ['SuperUser', 'Admin', 'Manager', 'Operator'] },

    ];

    const adminItems = [
      { name: 'Users', href: '/users', icon: Users, roles: ['SuperUser', 'Admin'] },
      { name: 'Tasks', href: '/tasks', icon: CheckSquare, roles: ['SuperUser', 'Admin'] }
    ];

    const specialItems = [
      { name: 'Secure Files', href: '/secure-files', icon: Shield, roles: ['SuperUser', 'ITRA'] },
      { name: 'QA Test', href: '/qa-test', icon: TestTube, roles: ['SuperUser', 'Admin', 'Manager'] }
    ];

    const utilityItems = [
      { name: 'Shortcuts', href: '/shortcuts', icon: ExternalLink, roles: ['SuperUser', 'Admin', 'User', 'Manager', 'Operator'] },
      { name: 'Profile', href: '/profile', icon: UserCircle, roles: ['SuperUser', 'Admin', 'User', 'Manager', 'Operator', 'ITRA', 'Guest'] },
      { name: 'Help', href: '/help', icon: HelpCircle, roles: ['SuperUser', 'Admin', 'User', 'Manager', 'Operator', 'ITRA', 'Guest'] }
    ];

    const superUserItems = [
      { name: 'Settings', href: '/settings', icon: Settings, roles: ['SuperUser'] }
    ];

    const allItems = [...baseItems, ...adminItems, ...specialItems, ...utilityItems, ...superUserItems];
    
    return allItems.filter(item => 
      item.roles.includes(user?.role || '')
    );
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed z-50 lg:hidden top-4 left-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div 
        className={`fixed lg:relative h-screen w-64 bg-white shadow-lg flex flex-col z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        initial={false}
      >
      {/* Logo */}
      <motion.div 
        className="p-6 border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link 
          href="/dashboard" 
          className="text-xl font-bold text-blue-900"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          SAAS Dashboard
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                prefetch={true}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </motion.div>
          );
        })}
        
        {/* Role indicator */}
        <motion.div 
          className="pt-4 mt-6 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="px-4 py-2">
            {(() => {
              let roleClass = 'bg-gray-100 text-gray-800';
              if (user?.role === 'SuperUser') {
                roleClass = 'bg-purple-100 text-purple-800';
              } else if (user?.role === 'Admin') {
                roleClass = 'bg-blue-100 text-blue-800';
              }
              return (
                <motion.span 
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${roleClass}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {user?.role} Access
                </motion.span>
              );
            })()}
          </div>
        </motion.div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center w-full px-4 py-3 text-left rounded-lg hover:bg-gray-100">
            <User className="w-8 h-8 mr-3 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              <p className="text-xs text-blue-600">{user?.role}</p>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 w-full mb-2 bg-white rounded-lg shadow-lg bottom-full ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`flex items-center w-full px-4 py-3 text-sm text-gray-700 rounded-lg ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      </motion.div>
    </>
  );
} 