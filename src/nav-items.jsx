import { 
  HomeIcon, 
  BookOpenIcon, 
  BarChartIcon, 
  AlertTriangleIcon, 
  BriefcaseIcon, 
  HelpCircleIcon 
} from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "首页",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "基础知识",
    to: "/basics",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "交易操作",
    to: "/trading",
    icon: <BarChartIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "风险提示",
    to: "/risks",
    icon: <AlertTriangleIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "实战案例",
    to: "/cases",
    icon: <BriefcaseIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "问答",
    to: "/faq",
    icon: <HelpCircleIcon className="h-4 w-4" />,
    page: <Index />,
  },
];
