import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { 
  ArrowUp, 
  ArrowDown, 
  X, 
  Check, 
  RefreshCw,
  DollarSign
} from "lucide-react";

const TradingSimulator = () => {
  const [stockPrice, setStockPrice] = useState(100);
  const [optionType, setOptionType] = useState("call");
  const [strikePrice, setStrikePrice] = useState(100);
  const [premium, setPremium] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [result, setResult] = useState(null);
  const dragAreaRef = useRef(null);
  const nodeRef = useRef(null);
  const [dragAreaWidth, setDragAreaWidth] = useState(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });

  const handleWidth = 32; // 滑块宽度

  useEffect(() => {
    const updateLayout = () => {
      if (!dragAreaRef.current) return;
      const width = dragAreaRef.current.offsetWidth;
      if (width > 0) {
        setDragAreaWidth(width);
        setBounds({ left: 0, right: width - handleWidth });
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const calculateProfit = () => {
    if (!strikePrice || !premium) return 0;
    
    const contractSize = 100; // 每份期权对应100股
    const totalCost = premium * contractSize * quantity;
    
    if (optionType === "call") {
      const profit = Math.max(stockPrice - strikePrice, 0) * contractSize * quantity - totalCost;
      return profit;
    } else {
      const profit = Math.max(strikePrice - stockPrice, 0) * contractSize * quantity - totalCost;
      return profit;
    }
  };

  const handleStop = (e, data) => {
    if (dragAreaWidth > 0) {
      const newPrice = Math.round(80 + (data.x / (dragAreaWidth - handleWidth)) * 40);
      setStockPrice(newPrice);
    }
  };

  const resetSimulator = () => {
    setStockPrice(100);
    setStrikePrice(100);
    setPremium(5);
    setQuantity(1);
    setResult(null);
  };

  const initialX = dragAreaWidth > 0 ? ((stockPrice - 80) / 40) * (dragAreaWidth - handleWidth) : 0;

  const executeTrade = () => {
    const profit = calculateProfit();
    setResult({
      profit,
      status: profit > 0 ? "盈利" : profit < 0 ? "亏损" : "持平"
    });
  };

  const profit = calculateProfit();
  const profitColor = profit > 0 ? "text-green-600" : profit < 0 ? "text-red-600" : "text-gray-600";

  return (
    <div className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">期权交易模拟器</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            通过拖拽滑块调整股价，设置期权参数，实时查看盈亏变化
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 左侧：控制面板 */}
            <div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">期权类型</label>
                <div className="flex space-x-4">
                  <button
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      optionType === "call" 
                        ? "bg-blue-100 border-blue-500 text-blue-700" 
                        : "border-gray-300"
                    }`}
                    onClick={() => setOptionType("call")}
                  >
                    <div className="flex items-center justify-center">
                      <ArrowUp className="mr-2" size={18} />
                      <span>看涨期权</span>
                    </div>
                  </button>
                  <button
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      optionType === "put" 
                        ? "bg-orange-100 border-orange-500 text-orange-700" 
                        : "border-gray-300"
                    }`}
                    onClick={() => setOptionType("put")}
                  >
                    <div className="flex items-center justify-center">
                      <ArrowDown className="mr-2" size={18} />
                      <span>看跌期权</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">行权价</label>
                  <input
                    type="number"
                    value={strikePrice}
                    onChange={(e) => setStrikePrice(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">权利金</label>
                  <input
                    type="number"
                    value={premium}
                    onChange={(e) => setPremium(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">合约数量</label>
                <div className="flex items-center">
                  <button 
                    className="p-2 bg-gray-100 rounded-l-lg border border-r-0"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    readOnly
                    className="flex-1 p-2 border-y border-gray-300 text-center"
                  />
                  <button 
                    className="p-2 bg-gray-100 rounded-r-lg border border-l-0"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={executeTrade}
                >
                  <Check className="mr-2" size={18} />
                  <span>执行交易</span>
                </button>
                <button
                  className="py-3 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                  onClick={resetSimulator}
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            {/* 右侧：交互区域 */}
            <div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>$80</span>
                  <span>当前股价: <span className="font-bold">${stockPrice}</span></span>
                  <span>$120</span>
                </div>
                <div 
                  ref={dragAreaRef}
                  className="h-2 bg-gray-200 rounded-full relative"
                >
                  <Draggable
                    nodeRef={nodeRef}
                    axis="x"
                    bounds={bounds}
                    defaultPosition={{ x: initialX, y: 0 }}
                    onStop={handleStop}
                    key={`${stockPrice}-${dragAreaWidth}`} // 当股价或容器宽度变化时，强制重新渲染
                  >
                    <div
                      ref={nodeRef}
                      className="absolute top-1/2 -mt-4 w-8 h-8 bg-blue-600 rounded-full cursor-grab shadow-lg"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        ${stockPrice}
                      </div>
                    </div>
                  </Draggable>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">行权价:</span>
                  <span className="font-bold">${strikePrice}</span>
                </div>
                <div className="h-1 bg-gray-300 rounded-full relative">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                    style={{ width: `${(strikePrice - 80) / 40 * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-bold text-gray-700 mb-3">盈亏计算</h3>
                <div className="flex justify-between mb-2">
                  <span>权利金成本:</span>
                  <span>${(premium * 100 * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>内在价值:</span>
                  <span>
                    {optionType === "call" 
                      ? `$${Math.max(stockPrice - strikePrice, 0) * 100 * quantity}` 
                      : `$${Math.max(strikePrice - stockPrice, 0) * 100 * quantity}`}
                  </span>
                </div>
                <div className="h-px bg-gray-200 my-3"></div>
                <div className="flex justify-between font-bold">
                  <span>预估盈亏:</span>
                  <span className={profitColor}>${profit.toFixed(2)}</span>
                </div>
              </div>

              {result && (
                <motion.div 
                  className={`mt-4 p-4 rounded-lg ${
                    result.status === "盈利" 
                      ? "bg-green-100 border border-green-300" 
                      : result.status === "亏损" 
                        ? "bg-red-100 border border-red-300" 
                        : "bg-gray-100 border border-gray-300"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center">
                    {result.status === "盈利" ? (
                      <Check className="text-green-600 mr-2" size={20} />
                    ) : result.status === "亏损" ? (
                      <X className="text-red-600 mr-2" size={20} />
                    ) : (
                      <DollarSign className="text-gray-600 mr-2" size={20} />
                    )}
                    <span className="font-bold">
                      {result.status}: ${Math.abs(result.profit).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSimulator;
