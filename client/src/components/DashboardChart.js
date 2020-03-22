import React, { useState } from 'react';

/* Import recharts components */
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const data = [
  {name: '01/20/2020', users: 4000, subscribers: 2400},
  {name: '01/21/2020', users: 3000, subscribers: 1398},
  {name: '01/22/2020', users: 2000, subscribers: 9800},
  {name: '01/23/2020', users: 2780, subscribers: 3908},
  {name: '01/24/2020', users: 1890, subscribers: 4800},
  {name: '01/25/2020', users: 2390, subscribers: 3800},
  {name: '01/26/2020', users: 3490, subscribers: 4300},
];

function DashboardChart(props) {
  return (
    <ResponsiveContainer width='100%' aspect={2.0/1.0}>
      <LineChart data={data} width = {1000} height = {500}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='subscribers' stroke='#8884d8'/>
        <Line type='monotone' dataKey='users' stroke='#82ca9d'/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DashboardChart;
