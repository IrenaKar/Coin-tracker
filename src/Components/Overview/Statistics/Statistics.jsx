import React, { useContext } from 'react'

import { Line } from 'react-chartjs-2';
import { Context } from '../../../Provider';




export default function Statistics() {
    const { entries, checked } = useContext(Context)
    const data = {
        labels: [entries.name],
        datasets: [
          {
            label: '# of Votes',
            data: [entries.amount],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    return (
        <div>
      

       <Line data={data} options={options} />
   
        </div>
    )
}

