import React, { ChangeEventHandler, FocusEventHandler, Fragment, KeyboardEventHandler, useEffect, useRef, useState } from 'react';

type Props = {};

const Search = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 下拉框内的数据
  const [relatedList, setRelatedList] = useState<Array<string>>([]);
  // 当前选中的数据
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  // input的内容
  const [inputVal, setInputVal] = useState<string>('');
  // 下拉框位置
  const [listLeft, setListLeft] = useState<string>('');

  useEffect(() => {
    inputRef.current && setListLeft(`${inputRef.current.getBoundingClientRect()?.x}px`)  
  }, [inputRef])

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setRelatedList(['前端行情', '欢度元宵', '杭州降雪', '东北红肠']);
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    _cleanAll();
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
  }

  const _cleanAll = () => {
    setRelatedList([]);
    setSelectedIdx(-1);
  }

  const handlekeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    switch (e.key) {
      case "Enter":
        {
          // 回车 当选中下拉框中的内容时，回车搜索选中的内容，否则搜索输入框中的内容
          const currentVal = selectedIdx != -1 ? relatedList[selectedIdx] : inputVal;
          setInputVal(currentVal);
          _cleanAll();
          console.log('搜索：', currentVal);
          
        }
        break;
      case "ArrowUp":
        {
          // 上键
          if (relatedList.length) {
            if (selectedIdx != 0 && selectedIdx != -1) {
              setSelectedIdx(selectedIdx - 1);
            } else {
              setSelectedIdx(relatedList.length - 1);
            }
          }
        }
        break;
      case "ArrowDown":
        {
          // 下键
          if (relatedList.length) {
            if (selectedIdx != relatedList.length - 1) {
              setSelectedIdx(selectedIdx + 1);
            } else {
              setSelectedIdx(0);
            }
          }
        }
        break;
    
      default:
        break;
    }
  }

  return (
    <Fragment>
      {
        relatedList.length > 0 && <div 
          style={listLeft ? {left: listLeft} : {}}
          className='fixed top-16 w-96 z-10 bg-white border-gray-200 p-2 rounded-md shadow-sm'
        >
          {
            relatedList.map((item, i) => <div key={i} 
            className={`${i === selectedIdx ? " text-blue-600 bg-gray-100" : " text-gray-700"} h-8 rounded-md px-2 flex items-center`}>
              {item}
            </div>)
          }
        </div>
      }
      <div className='flex items-center'>
        <input 
        onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} onKeyDown={handlekeyDown} value={inputVal}
        ref={inputRef} type="text" className='w-96 h-8 border border-gray-100 px-4 rounded-full bg-gray-50' placeholder='最近前端行情' />
        <button className='w-16 h-8 mx-4 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300'>提问</button>
      </div>
    </Fragment>
  )
}

export default Search;