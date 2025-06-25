import { motion } from "framer-motion";
import { 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Share2,
  Bookmark
} from "lucide-react";

const KnowledgeCards = () => {
  const cards = [
    {
      icon: <Lightbulb size={24} />,
      title: "期权核心概念",
      items: [
        "期权是权利而非义务",
        "看涨期权: 上涨获利",
        "看跌期权: 下跌获利",
        "权利金是期权成本"
      ],
      color: "bg-blue-100 text-blue-800"
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "常见风险",
      items: [
        "时间价值衰减",
        "波动率变化风险",
        "流动性风险",
        "方向判断错误"
      ],
      color: "bg-orange-100 text-orange-800"
    },
    {
      icon: <TrendingUp size={24} />,
      title: "交易策略",
      items: [
        "从小资金开始",
        "设置止盈止损",
        "避免裸卖期权",
        "分散投资组合"
      ],
      color: "bg-green-100 text-green-800"
    },
    {
      icon: <Shield size={24} />,
      title: "风险管理",
      items: [
        "单笔交易不超过5%资金",
        "使用对冲策略",
        "关注希腊字母指标",
        "定期评估持仓"
      ],
      color: "bg-purple-100 text-purple-800"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">知识要点总结</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            掌握这些核心概念，开启你的期权交易之旅
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`p-4 flex items-center ${card.color}`}>
                <div className="mr-3">{card.icon}</div>
                <h3 className="text-lg font-bold">{card.title}</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 mr-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">保存学习进度</h3>
              <p className="max-w-md">
                注册账户保存你的学习进度，随时随地继续学习
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center">
                <Bookmark className="mr-2" size={18} />
                <span>保存进度</span>
              </button>
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center">
                <Share2 className="mr-2" size={18} />
                <span>分享给朋友</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCards;
