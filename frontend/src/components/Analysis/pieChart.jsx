import * as React from 'react';

import { PieChart } from '@mui/x-charts/PieChart';


export default function PiChart() {

  let data=[        
    { value: 25, label: 'series A' },
    { value: 25, label: 'series B' },
    { value: 25, label: 'series C' },
    { value: 25, label: 'series D' },
]
  return (
    <PieChart
    series={[
      {
        data: data,
        innerRadius: 30,
        outerRadius: 100,
        paddingAngle: 5,
        cornerRadius: 5,
        startAngle: -90,
        endAngle: 270,
        cx: 150,
        cy: 150,
      }
    ]}  
    width={400}
    height={400}
  />
  );
}