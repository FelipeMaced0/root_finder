"use client"

import Image from 'next/image'
import { bissection, falsePosition, secant, newtonRaphson, estimativeResult, allMethods } from './rootFindingMethods'
import { useContext, useEffect, useState } from 'react'
import ScatterChart from './components/scatterchart'
import SelectMenu from './components/selectmenufunction';
import { SelectedContext } from './context';
import LineChart from './components/linechart';
import * as Functions from './functions/functions';
import calculateFunction from './functions/calculate';
import SelectMenuMethod from './components/selectmenumethod';

export default function Home() {
  const [data, setData] = useState<estimativeResult>();
  const [intervalA , setIntevalA] = useState(-1);
  const [intervalB , setIntevalB] = useState(1);
  const [idInterval, setIdInterval] = useState<NodeJS.Timer>();
  const { selectedFunction, rootFindingMethod } = useContext(SelectedContext);

  let currentIter: any;

  const findRoot = () => {
    let generator = rootFindingMethod?.value({ begin: intervalA, end: intervalB, fun_exp: selectedFunction.value });

    const idInterval = setInterval(()=>{
      currentIter = generator?.next();
      if (!currentIter?.done && currentIter !== undefined) {
        setData(currentIter?.value);
      }else{
        clearInterval(idInterval);
      }
    }, 3000);
    setIdInterval(idInterval);
  }
  
  const onInputChange = async (e:any, set:any) => {
    const {name, value} = e.target;
    if(!isNaN(value)){
      set(Number.parseFloat(value));  
    };
  }

  const unsetInterval = ()=>{
    clearInterval(idInterval)
    setIdInterval(undefined);
  }

  return (
    <main className="flex min-h-screen flex-col justify-between p-10">
      <div className="z-10 w-full justify-between font-mono text-sm lg:flex">
        <div className='flex flex-col justify-between h-2 w-22 space-y-3'>
          <div className="flex flex-col space-between rounded border border-solid border-neutral-300 p-5">
            <span>Iteration:{data?.k}</span>
            <span>Root: {data?.root[0].x.toPrecision(6)}</span>
            <span>Error%: {data?.estimative_error.toPrecision(6)}</span>
          </div>
          <SelectMenu list={Functions.ALLFUNCTIONS} />
          <SelectMenuMethod list={allMethods} />
          <div className='in'>
            <span>Interval</span>
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input type="text" pattern="\d+" value={intervalA} onChange={(e)=>onInputChange(e, setIntevalA)} className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder="a"/>
                <input type="text" pattern="\d+" value={intervalB} onChange={(e)=>onInputChange(e, setIntevalB)} className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary" placeholder="b"/>
            </div>
            <button onClick={()=>{!idInterval?findRoot():unsetInterval()}} className="rounded bg-emerald-300 p-3 text-black"> {!idInterval?"Find Root":"Stop"}</button>
          </div>
          
          </div>
          <div style={{ width: 500, height: 500 }}>
            <ScatterChart root={data?.root} bounderies={data?.interval} />
          </div>
          <div style={{ width: 500, height: 500 }}>
            <LineChart name={selectedFunction?.name} data={calculateFunction(selectedFunction ? selectedFunction.value : "")} />
          </div>
        </div>
    </main>
  )
}
