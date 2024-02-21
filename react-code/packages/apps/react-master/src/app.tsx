import * as React from 'react';
import styles from "./app.module.less";

type Props = {}

function App({}: Props) {
  return (
    <div className={styles.app}>
      <div className='flex w-full justify-around'>
        <div>this</div>
        <div>is</div>
        <div>tailwindcss</div>
      </div>
    </div>
  )
}

export default App;