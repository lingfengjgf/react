import * as React from 'react';
import { mockList } from './mockList';

interface IProps {
  item: any
}

const RecommandData: React.FC<IProps> = ({ item }) => {
  return <div className='flex flex-col items-start p-4 border-b'>
    {/* 标题 */}
    <div className='flex h-auto justify-start'>
      <a className=' font-bold text-black text-lg leading-10' target='_blank' href={`https://www.zhihu.com/question/${item?.target?.question?.id}/answer/${item?.target?.id}`}>
        {item?.target?.question?.title || item?.target?.title}
      </a>
    </div>
  </div>
}

type Props = {};

const RecommandList = (props: Props) => {
  return (
    <div className='flex flex-col border-t'>
      {mockList.map((item: any, i) => <RecommandData key={item.id + i} item={item} />)}
    </div>
  )
}

export default RecommandList;