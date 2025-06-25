import { useEffect } from "react";
import { motion } from "framer-motion"; // 添加 motion 导入
import Navbar from "../components/Navbar";
import ConceptSection from "../components/ConceptSection";
import TradingSimulator from "../components/TradingSimulator";
import ProfitChart from "../components/ProfitChart";
import KnowledgeCards from "../components/KnowledgeCards";
import VisualGuides from "../components/VisualGuides";

const Index = () => {
  useEffect(() => {
    // 保存学习进度到本地存储
    const saveProgress = () => {
      localStorage.setItem('option-learning-progress', 'started');
    };
    
    // 检查是否有保存进度
    const progress = localStorage.getItem('option-learning-progress');
    if (!progress) {
      saveProgress();
    }
    
    // 页面加载时滚动到顶部
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* 英雄区域 */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            期权交易入门指南
          </motion.h1>
          <motion.p 
            className="text-xl max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            专为股票交易者设计的期权学习平台，从零开始掌握期权交易
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors">
              开始学习
            </button>
          </motion.div>
        </div>
      </div>
      
      <ConceptSection />
      <TradingSimulator />
      <ProfitChart />
      <KnowledgeCards />
      <VisualGuides />
      
      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">期权入门指南</h3>
              <p className="text-gray-400">
                为股票交易者提供专业的期权教育内容，降低学习门槛，提升交易技能。
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">学习资源</h4>
              <ul className="space-y-2 text-gray-400">
                <li>基础知识</li>
                <li>视频教程</li>
                <li>术语词典</li>
                <li>常见问题</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">交易工具</h4>
              <ul className="space-y-2 text-gray-400">
                <li>期权计算器</li>
                <li>策略分析器</li>
                <li>波动率图表</li>
                <li>经济日历</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">联系我们</h4>
              <ul className="space-y-2 text-gray-400">
                <li>客服支持</li>
                <li>意见反馈</li>
                <li>合作咨询</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 期权入门指南. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
