import * as React from 'react';
import Nav from '../../components/Nav';
import Card from '../../components/Card';

type Props = {};

function Home({}: Props) {
  return (
    <div className='bg-gray-100'>
      <Nav />
      <div className=' mx-auto max-w-5xl flex my-2 px-2'>
        <Card className=' w-2/3'>tabs</Card>
        <div className=' w-1/3 flex flex-1 flex-col'>
          <Card className=' w-full'>tabs</Card>
          <Card className=' w-full'>tabs</Card>
          <Card className=' w-full'>tabs</Card>
        </div>
      </div>
    </div>
  )
}

export default Home;