import PiChart from "./Analysis/pieChart";
import LineGraph from "./Analysis/lineGraph";
import { Divider } from "@mui/material";
import SimplePieChart from "./Analysis/simplePie";
import SelectWiseCategory from "./Analysis/SelectWise";
export default function Analysis(){
    return(
        <div className="flex divide-x-2">
            <div className="m-6 flex flex-col  items-center">
                <img className="bg-red-400 w-[200px] h-[200px] rounded-full" />
                <div>
                    <div className="flex flex-col gap-y-6 mt-6">
                        <div className="text-[25px]">
                        <span className="font-bold">Name :</span>
                        <span className=" font-extrabold"> Vanshaj Tiwari</span>
                        </div>
                        <div className="text-[25px]">
                        <span className="font-bold">Email :</span>
                        <span className="font-extrabold"> vanshajtiwari62@gmail.com</span>
                        </div> 
                        <div className="text-[25px]">
                        <span className="font-bold">address :</span>
                        <span className=""> Mathura</span>
                        </div>                        
                        <div className="text-[25px]">
                        <span className="font-bold">since :</span>
                        <span> 12/23/2002</span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="p-12 ">
                <div className="flex justify-between">
                    <h1 className="text-[45px] font-bold">Sales</h1>
                    <div className="flex justify-center items-center border-[1px] w-[200px] rounded-lg  overflow-hidden">
                        <button className="bg-green-200 w-1/2 text-green-600 text-[20px] border-green-600 border-2 font-extrabold h-full flex items-center  justify-center hover:pointer">Profit</button>
                        <Divider orientation="vertical"/>
                        <button className="bg-red-200  w-1/2 text-red-600 text-[20px] border-red-600 border-2 font-extrabold h-full flex items-center justify-center  hover:pointer">Loss</button>
                    </div>
                </div>
                <div className="">
                    <div className="totalSales">
                        <div className="text-blue-400 m-3 text-[25px] font-extrabold underline">Total Sales</div>
                        <div className="flex h-[300px] w-full gap-x-2">
                            <PiChart className="w-1/4"/>
                            <Divider orientation="vertical" variant="middle" flexItem className=""/>
                            <LineGraph className="w-3/4"/>
                        </div>
                    </div>
                    <div className="m-3">
                        <h1 className="text-blue-400 font-extrabold text-[25px] underline">Category Wise Stats</h1>
                    </div>
                    <div className="CategoryWise flex gap-x-3">
                            <div>
                                <SelectWiseCategory/>
                            </div>
                    </div>
                </div>
                <div>
                    <div className="text-[35px] font-extrabold underline">TOP SOLD 🔥</div>
                    <ol>
                        <li className="flex bg-gray-200 justify-around items-center p-2 text-[20px] w-full">
                            <span className="w-1/3">Electronics</span>
                            <span className="w-1/3font-bold">1550$</span>
                            <div className="w-1/3 flex items-center justify-center">
                              <span className="w-1/3 bg-red-200 text-red-600 font-bold rounded-lg p-3">Loss :{-1000}</span>
                            </div>
                        </li>
                        <li className="flex bg-gray-200 justify-around items-center p-2 text-[20px] w-full">
                            <span className="w-1/3">Electronics</span>
                            <span className="w-1/3font-bold">1550$</span>
                            <div className="w-1/3 flex items-center justify-center">
                              <span className="w-1/3 bg-green-200 text-green-600 font-bold rounded-lg p-3">Loss :{-1000}</span>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}