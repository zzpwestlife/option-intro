import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";
import { 
  ArrowUp, 
  ArrowDown, 
  ChevronDown,
  ChevronUp
} from "lucide-react";

const ProfitChart = () => {
  const [activeTab, setActiveTab] = useState("call");
  
  // 生成模拟数据
  const generateData = (type) => {
    const data = [];
    const strikePrice = 100;
    const premium = 5;
    
    for (let price = 70; price <= 130; price += 5) {
      let profit;
      
      if (type === "call") {
        profit = Math.max(price - strikePrice, 0) - premium;
      } else {
        profit = Math.max(strikePrice - price, 0) - premium;
      }
      
      // 每份期权对应100股
      profit *= 100;
      
      data.push({
        price,
        profit
      });
    }
    
    return data;
  };
  
  const callData = generateData("call");
  const putData = generateData("put");
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-bold">股价: ${label}</p>
          <p className={payload[0].value >= 0 ? "text-green-600" : "text-red-600"}>
            盈亏: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">期权损益分析</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            直观展示不同市场行情下期权的盈亏变化
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
          <div className="flex mb-6 border-b">
            <button
              className={`py-2 px-6 font-medium ${
                activeTab === "call" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("call")}
            >
              <div className="flex items-center">
                <ArrowUp className="mr-2" size={18} />
                <span>看涨期权损益</span>
              </div>
            </button>
            <button
              className={`py-2 px-6 font-medium ${
                activeTab === "put" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("put")}
            >
              <div className="flex items-center">
                <ArrowDown className="mr-2" size={18} />
                <span>看跌期权损益</span>
              </div>
            </button>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activeTab === "call" ? callData : putData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="price" 
                  label={{ 
                    value: '股票价格 ($)', 
                    position: 'insideBottomRight', 
                    offset: -5 
                  }} 
                />
                <YAxis 
                  label={{ 
                    value: '盈亏 ($)', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke={activeTab === "call" ? "#3b82f6" : "#ef4444"}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                  name="盈亏曲线"
                />
                
                {/* 行权价参考线 */}
                <Line
                  type="monotone"
                  dataKey={100}
                  stroke="#94a3b8"
                  strokeDasharray="5 5"
                  dot={false}
                  name="行权价 ($100)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                <ChevronUp className="mr-2 text-green-600" size={20} />
                <span>看涨期权关键点</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 最大亏损: 权利金成本</li>
                <li>• 盈亏平衡点: 行权价 + 权利金</li>
                <li>• 股价上涨时收益潜力无限</li>
                <li>• 适合强烈看涨的市场预期</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-bold text-orange-800 mb-3 flex items-center">
                <ChevronDown className="mr-2 text-red-600" size={20} />
                <span>看跌期权关键点</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 最大亏损: 权利金成本</li>
                <li>• 盈亏平衡点: 行权价 - 权利金</li>
                <li>• 最大收益: 行权价 - 权利金 (当股价归零)</li>
                <li>• 适合对冲风险或看跌市场</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitChart;
