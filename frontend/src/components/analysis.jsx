export default function Analysis(){
    return(
        <div className="flex divide-x-2 h-[70vh]">
            <div className="m-6 flex flex-col justify-center items-center">
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
            <div>
                <div>
                    <h1 className="text-[25px] font-bold">Sales</h1>
                </div>
            </div>
        </div>
    )
}