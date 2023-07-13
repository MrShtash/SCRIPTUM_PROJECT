import React from 'react';
// import ApexCharts from 'apexcharts'
import {
        Chart,
        Title,
        Legend,
        Tooltip,
        StackedColumnSeries,
} from '@smart-webcomponents-react/chart';
// import Chart from "react-apexcharts";

import 'smart-webcomponents-react/source/styles/smart.default.css';
import '@smart-webcomponents-react/chart/styles/smart.default.css';

const ChartComponent = ({workedHours,
                        hourlyRate,
                        totalHours }) => {
    const remainingHours = totalHours - workedHours;
    const overtimeHours = workedHours > totalHours ? workedHours - totalHours : 0;

    const data = [
        {department: 'Worked Hours', value: workedHours},
        {department: 'Remaining Hours', value: remainingHours},
        {department: 'Overtime', value: overtimeHours},
    ];

    return (
        <Chart>
        <Title text = "Worked Hours Chart" />
        <Legend visible = {true} position = "right" />
        <Tooltip visible = {true} formatFunction = {(value) => `${value} hours`} />
        <StackedColumnSeries
            dataField = "value"
            displayText = "department"
            colors = {['#00b200', '#0072c6', '#ff0000']}
            dataSource = {data}
        />
        </Chart>
  );
};

export default ChartComponent;
