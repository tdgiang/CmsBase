import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/core/styles'

// [{
//     date: "09/03/2022",
//     total_in: 1000000,
//     total_ount: 2000000
// }, {
//     date: "08/03/2022",
//     total_in: 0,
//     total_out: 2000000
// }]

const CustomLineChart = ({ dayShow, moneyOut, moneyInput }) => {
    const option = {
        color: ['#FFC700', 'var(--color-primary)'],
        title: {
            text: 'Biều đồ biểu diễn số lượng tiền ra vào',
        },
        textStyle: {
            fontFamily: 'Arial',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                },
            },
        },
        legend: {
            data: [
                'Tiền ra',
                'Tiền vào',
                // 'Video Ads',
                // 'Direct',
                // 'Search Engine',
            ],
        },

        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: dayShow,
            },
        ],
        yAxis: [
            {
                type: 'value',
                boundaryGap: false,
            },
        ],
        series: [
            {
                name: 'Tiền ra',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series',
                },
                data: moneyOut,
            },
            {
                name: 'Tiền vào',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series',
                },
                data: moneyInput,
            },
        ],
    }

    return <ReactEcharts option={option} />
}

export default CustomLineChart
