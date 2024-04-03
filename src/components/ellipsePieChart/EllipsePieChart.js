import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { value: 70, label: '70%', color: '#FF9304' },
  { value: 10, label: '10%', color: 'yellow' },
  { value: 30, label: '30%', color: '#00008B' },
];

const size = {
  width: 400,
  height: 200,
};

export default function EllipsePieChart() {
  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.label}`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}
