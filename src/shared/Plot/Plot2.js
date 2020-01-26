import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


const TiltedAxisTick = (props) => {

  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        textAnchor="end" 
        fill="#666" 
        transform="rotate(-45)">
          {payload.value}
      </text>
    </g>
  );

};


export const Chart = (data) => (
    <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 35, left: 35, bottom: 130,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          tick={<TiltedAxisTick />}
          interval={0} />
        <YAxis />
        <Tooltip cursor={{fill: 'none'}} />
        <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
)

export default Chart;