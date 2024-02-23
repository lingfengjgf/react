import * as React from 'react';
import Nav from '../../components/Nav';
import Card from '../../components/Card';
import Tabs from './Tabs';
import Creation from './Creation';
import AdvancedBtns from './AdvancedBtns';
import SelfFunctions from './SelfFunctions';

type Props = {};

function Home({}: Props) {
  return (
    <div className='bg-gray-100 w-full'>
      <Nav />
      <div className=' mx-auto max-w-5xl flex my-2 px-2'>
        <Card className=' w-2/3'><Tabs /></Card>
        <div className=' w-1/3 flex flex-1 flex-col'>
          <Card className=' w-full'><Creation /></Card>
          <Card className=' w-full'><AdvancedBtns /></Card>
          <Card className=' w-full'><SelfFunctions /></Card>
        </div>
      </div>
    </div>
  )
}

export default Home;