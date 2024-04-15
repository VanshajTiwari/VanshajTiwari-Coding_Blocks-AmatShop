import { LineChart } from "@mui/x-charts"
export default function LineGraph({width,height,type}){
    let range=[1,2,3,4,5,6,7,8,9,10];
    if(type){
        if(type==="day"){
            for(let i=1;i<=31;i++){
                range[i]=i;
            }
        }
        if(type==="hourly"){
            for(let i=1;i<=24;i++){
                range[i-1]=i;
            }
        }
        else if(type==="monthly"){
            for(let i=1;i<=12;i++){
                range[i-1]=i;
            }

        }else if(type==="yearly"){
            for(let i=1;i<=5;i++){
                range[i-1]=i;
            }
        }
    }
    return (
                <LineChart
        xAxis={[{ data: range }]}
        series={[
            {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
        ]}
        height={!height?300:height}
        width={!width?900:width}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
        />
    )
}