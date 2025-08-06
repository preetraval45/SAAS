import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Users, CheckSquare, Activity, TrendingUp } from 'lucide-react';
import { CardSkeleton } from './Skeleton';

export default function Dashboard() {
  const { user, loading } = useAuth();

  const overviewCards = [
    {
      title: 'Total Users',
      value: '1,247',
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Tasks',
      value: '89',
      icon: CheckSquare,
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      icon: Activity,
      change: '24h',
      changeType: 'neutral'
    },
    {
      title: 'Performance',
      value: '94%',
      icon: TrendingUp,
      change: '+2%',
      changeType: 'positive'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-gray-50">
        <div className="mb-8">
          <div className="w-48 h-8 mb-2 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-64 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const skeletonKey = `skeleton-${i}-${Math.random().toString(36).substring(2, 11)}`;
            return <CardSkeleton key={skeletonKey} />;
          })}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen p-6 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user?.username}</p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          // Extract the color class from the changeType
          let changeColorClass = 'text-gray-500';
          if (card.changeType === 'positive') {
            changeColorClass = 'text-green-600';
          } else if (card.changeType === 'negative') {
            changeColorClass = 'text-red-600';
          }

          return (
            <motion.div 
              key={card.title} 
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="mt-2 text-2xl font-bold text-blue-900">{card.value}</p>
                  <p className={`text-sm mt-1 ${changeColorClass}`}>
                    {card.change}
                  </p>
                </div>
                <motion.div 
                  className="p-3 bg-blue-100 rounded-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-6 h-6 text-blue-600" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div 
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="mb-4 text-lg font-semibold text-blue-900">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { color: 'bg-green-500', text: 'New user registered - 2 hours ago' },
              { color: 'bg-blue-500', text: 'Task completed - 4 hours ago' },
              { color: 'bg-yellow-500', text: 'System maintenance - 1 day ago' }
            ].map((item, index) => (
              <motion.div 
                key={item.text}
                className="flex items-center space-x-3"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className={`w-2 h-2 ${item.color} rounded-full`}></div>
                <span className="text-sm text-gray-600">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="mb-4 text-lg font-semibold text-blue-900">Quick Actions</h3>
          <div className="space-y-3">
            {[
              'Create New Task',
              'Manage Users',
              'View Reports'
            ].map((action, index) => (
              <motion.button 
                key={action}
                className="w-full p-3 text-left transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium text-gray-900">{action}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}