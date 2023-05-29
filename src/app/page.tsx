"use client"

import Image from 'next/image'
import { bissection, falsePosition, secant, newtonRaphson, estimativeResult} from './rootFindingMethods'
import { useEffect, useState } from 'react'
import ScatterChart from  './components/scatterchart'
import SelectMenu from './components/selectmenu';
import LineChart from './components/linechart';

export default function Home() {
  const [data, setData] = useState<estimativeResult>();
  const generator = newtonRaphson();
  let currentIter: any;

  

  useEffect(()=>{
    
    setInterval(() => {
      currentIter = generator.next();
      if(!currentIter?.done){
        setData(currentIter.value);
        console.log(currentIter?.value);
      } 
    }, 3000);
    
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      <div className="z-10 w-full justify-between font-mono text-sm lg:flex">
        <div>
          <div style={{display:"flex", flexDirection: "column",justifyContent:"space-between"}}>
            <span>Iteration:{data?.k}</span>
            <span>Root: {data?.root[0].x.toPrecision(8)}</span>
            <span>Estimative Error: {data?.estimative_error.toPrecision(8)}</span>
          </div>
          <SelectMenu/>
        </div>
        
        <div style={{width: 500, height:500}}>
          <ScatterChart root={data?.root} bounderies={data?.interval}/>
        </div>
        <div style={{width: 500, height:500}}>
          <LineChart/>
        </div>
      </div>
    </main>
  )
}
