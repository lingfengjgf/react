import React, { useEffect, useRef } from 'react';
import { router } from '../../../router';
import { NavLink, Outlet } from 'react-router-dom';

type Props = {
  onChange?: (bool: boolean) => void;
};

type tabChild = {
  path: string,
  title: string
}

const Tabs = ({ onChange }: Props) => {
  const tabs = router[0].children;

  // 当tab不显示的时候，切换导航栏内容
  const scrollRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver(交叉观察器) 监听元素是否进入了设备的可视区域之内
  // MutationObserver(变化观察器) 目标元素DOM发生变动就会触发观察器的回调函数
  // ResizeObserver(大小观察器) 目标元素内容或边框的大小变化时都会向观察者传递通知
  // PerformanceObserver(性能观察器) 主要用于监测性能度量事件，在浏览器的性能时间轴记录新的 performanceEntry 时会被通知
  // ReportingObserver (报告观察器) 监听过时的api、浏览器的一些干预行为报告，在回调里上报

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | undefined = new IntersectionObserver((entires) =>{
      // console.log("isIntersecting:", entires[0].isIntersecting);
      onChange?.(entires[0].isIntersecting)
    })

    scrollRef.current && intersectionObserver.observe(scrollRef.current);

    return () => {
      scrollRef.current && intersectionObserver?.unobserve(scrollRef.current);
    }
  }, [])

  return (
    <div className='w-full'>
      <div ref={scrollRef}></div>
      <div className='flex mx-6 box-border'>
        {
          tabs.map((tab:tabChild, i:number) => <NavLink key={i} to={tab.path || ''} className={({ isActive }) => 
          " whitespace-nowrap py-4 px-4 text-base transition-all" + ( isActive ? " text-blue-600 font-bold" : " text-black hover:text-blue-900" )
        }> <div>{tab.title} </div> </NavLink>)
        }
      </div>
      <Outlet />
    </div>
  )
}

export default Tabs;