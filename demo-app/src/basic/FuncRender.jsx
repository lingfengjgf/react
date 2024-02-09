import React, { useEffect, useState } from 'react';

export default function FuncRender(props) {
  const [show, setShow] = useState(true);

  const Hide = () => <div>暂无数据</div>
  const Title = ({title}) => title ? <div>{title}</div> : <Hide />

  const [list, setList] = useState([]);

  useEffect(() => {
    setList([
      {name: '吃饭'},
      {name: '睡觉'},
      {name: '打豆豆'}
    ])
  }, [])

  return (
    <div>
      <h2>条件渲染</h2>
      <button onClick={() => setShow(!show)}>{show ? '显示' : '隐藏'}</button>

      {/* 以react组件的方式处理 */}
      <Title title={show ? '显示数据' : ''}/>

      {/* 以函数的方式处理 */}
      {Title({title: show ? '显示数据' : ''})}

      <h2>列表渲染</h2>

      <ul>
        {
          list.map((item, i) => <li key={i}>{item.name}</li>)
        }
      </ul>

      <ol>
        {
          (() => {
            let res = [];
            for (let item of list) {
              res.push( <li key={item.name}>{item.name}</li> )
            }
            return res;
          })()
        }
      </ol>
    </div>
  )
}