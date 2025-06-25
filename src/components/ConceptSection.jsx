import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react";

const ConceptSection = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">期权核心概念</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            期权是一种赋予你在未来特定时间以特定价格买入或卖出资产的权利，但不是义务
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 看涨期权 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <ArrowUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">看涨期权 (Call Option)</h3>
            </div>
            <p className="text-gray-600 mb-4">
              当预期股票价格上涨时使用。赋予你在未来以固定价格买入股票的权利。
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="mr-2 text-green-500" size={16} />
              <span>类比：预订限量商品，涨价时仍按原价购买</span>
            </div>
          </motion.div>

          {/* 看跌期权 */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <ArrowDown className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">看跌期权 (Put Option)</h3>
            </div>
            <p className="text-gray-600 mb-4">
              当预期股票价格下跌时使用。赋予你在未来以固定价格卖出股票的权利。
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingDown className="mr-2 text-red-500" size={16} />
              <span>类比：购买保险，价格下跌时获得补偿</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">期权关键要素</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "标的资产", desc: "期权对应的股票或指数" },
              { title: "行权价", desc: "预先设定的买卖价格" },
              { title: "到期日", desc: "期权有效的最后日期" },
              { title: "权利金", desc: "购买期权支付的费用" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-semibold text-blue-700">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSection;
