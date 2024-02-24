import React, { MouseEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { mockList } from './mockList';

interface IProps {
  item: any
}

const RecommandData: React.FC<IProps> = ({ item }) => {

  const [selected, setSelected] = useState<boolean>(false);

  const handleClick: MouseEventHandler<Element> = (e) => {
    e?.preventDefault();
    setSelected(val => !val);
  }

  return <div className='flex flex-col items-start p-4 border-b'>
    {/* 标题 */}
    <div className='flex h-auto justify-start'>
      <a className=' font-bold text-black text-lg leading-10' target='_blank' href={`https://www.zhihu.com/question/${item?.target?.question?.id}/answer/${item?.target?.id}`}>
        {item?.target?.question?.title || item?.target?.title}
      </a>
    </div>

    {/* 文章内容 */}
    {
      selected ? <div dangerouslySetInnerHTML={{__html: item?.target?.content}}></div> : 
      <a href="/" onClick={handleClick} className=' cursor-pointer text-gray-800 hover:text-gray-500'>
        {item?.target?.excerpt}
        <span className=' text-sm leading-7 text-blue-500 hover:text-gray-500'>阅读全文 &gt;</span>
      </a>
    }

    {/* 底部 */}
    <div className={`flex bg-white w-full ${selected ? " bottom-0 border-t sticky" : ""}`}>
      <div className='h-10 rounded-md text-blue-500 bg-blue-100 p-2 m-2 inline-flex'>
        <span className='inline-flex'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>赞同
        </span>
      </div>
      <div className='h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
          <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          </span>
      </div>
      <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
          <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          &nbsp; {item?.target?.comment_count} 条评论
      </div>
      <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
          <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          收藏
      </div>
      <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
          <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          喜欢
      </div>
      <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
          <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
          分享
      </div>
      {
        selected && <div onClick={handleClick} className=' text-base text-gray-400 p-2 m-2 inline-flex cursor-pointer'>
          <span className='inline-flex'>收起</span>
        </div>
      }
    </div>
  </div>
}

type Props = {};

const fatchList = () => {
  return new Promise<Array<any>>((resolve, reject) => {
    setTimeout(() => {
      resolve(mockList.slice(10, 20) as Array<any>);
    }, 300)
  })
}

// 自定义hooks

// useEffect型
const useRefInsObsEffect = (fn: (b: boolean) => void, ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    let intersectionObserver: IntersectionObserver | undefined = new IntersectionObserver((entires) =>{
      fn(entires[0]?.isIntersecting);
    })

    ref.current && intersectionObserver.observe(ref.current);

    return () => {
      ref.current && intersectionObserver?.unobserve(ref.current);
    }
  }, [])
}

// useState型
const useRefInsObsState = (ref: RefObject<HTMLDivElement>) => {
  const [list, setList] = useState<Array<any>>(mockList.slice(0, 10));

  useEffect(() => {
    let intersectionObserver: IntersectionObserver | undefined = new IntersectionObserver((entires) =>{
      entires[0].isIntersecting && fatchList().then((res: Array<any>) => {
        setList(list => [...list, ...res])
      })
    })

    ref.current && intersectionObserver.observe(ref.current);

    return () => {
      ref.current && intersectionObserver?.unobserve(ref.current);
    }
  }, [])

  return list;
}

const RecommandList = (props: Props) => {

  const scrollRef = useRef<HTMLDivElement>(null);

  const list = useRefInsObsState(scrollRef);
  
  // const [list, setList] = useState<Array<any>>(mockList.slice(0, 10));
  // useRefInsObsEffect((b) => {
  //   b && fatchList().then((res: Array<any>) => {
  //     setList(list => [...list, ...res])
  //   })
  // }, scrollRef)

  // useEffect(() => {
  //   let intersectionObserver: IntersectionObserver | undefined = new IntersectionObserver((entires) =>{
  //     entires[0].isIntersecting && fatchList().then((res: Array<any>) => {
  //       setList(list => [...list, ...res])
  //     })
  //   })

  //   scrollRef.current && intersectionObserver.observe(scrollRef.current);

  //   return () => {
  //     scrollRef.current && intersectionObserver?.unobserve(scrollRef.current);
  //   }
  // }, [])

  return (
    <div className='flex flex-col border-t'>
      {list.map((item: any, i) => <RecommandData key={item.id + i} item={item} />)}

      {/* 上拉加载 */}
      <div ref={scrollRef} className='flex h-14 justify-center items-center text-gray-500'>loading...</div>
    </div>
  )
}

export default RecommandList;