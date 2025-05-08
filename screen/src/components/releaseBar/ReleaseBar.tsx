import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';

export default function ReleaseBar() {
    const chartRef = useRef<HTMLDivElement>(null);
    const [option, setOption] = useState({
        grid: {
            left: "1%",
            right: "15%",
            top: "25%",
            bottom: "5%",
            width: "100%",
            heigth: "100%",
            containLabel: true
        },
        legend: {
            type: "scroll",
            top: "0",
            orient: "horizontal",
            textStyle: {
                color: "#fff"
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                shadowStyle: { opacity: 0 }
            },
            backgroundColor: "rgba(0,0,0,1)",
            borderWidth: 1,
            borderColor: "#999999",
            textStyle: {
                color: "#ffffff",
                fontSize: 10
            },
            extraCssText: "z-index: 9999;",
            appendToBody: true
        },
        xAxis: [
            {
                type: "category",
                interval: 0,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#435459"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: "#ffffff",
                    fontSize: 10,
                    interval: 0,
                    padding: [0, 0, 0, 0]
                },
                data: ["12:00", "14:00", "17:00", "20:00"]
            }
        ],
        yAxis: {
            type: "value",
            axisLine: {
                show: true
            },
            axisTick: {
                show: true
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: [2, 2],
                    dashOffset: 5,
                    color: ["rgba(255, 255, 255, 1)"],
                    opacity: 1,
                    width: 0.3
                }
            },
            axisLabel: {
                formatter: "{value}",
                color: "#ffff"
            }
        },
        series: [
            {
                name: '一年级',
                data: [100, 120, 130, 110],
                type: "bar",
                barWidth: 10,
                barGap: 1,
                label: {
                    show: true,
                    position: "top",
                    distance: 10,
                    color: "#ffffff",
                    fontSize: 8,
                    formatter: "{c}"
                },
                itemStyle: {
                    borderRadius: 0,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#79EBCF" },
                        { offset: 1, color: "#0B6360" }
                    ])
                }
            },
            {
                name: '二年级',
                data: [60, 100, 150, 90],
                type: "bar",
                barWidth: 10,
                barGap: 1,
                label: {
                    show: true,
                    position: "top",
                    distance: 10,
                    color: "#ffffff",
                    fontSize: 8,
                    formatter: "{c}"
                },
                itemStyle: {
                    borderRadius: 0,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#40AEFE" },
                        { offset: 1, color: "#25567A" }
                    ])
                }
            },
            {
                name: '三年级',
                data: [60, 100, 150, 90],
                type: "bar",
                barWidth: 10,
                barGap: 1,
                label: {
                    show: true,
                    position: "top",
                    distance: 10,
                    color: "#ffffff",
                    fontSize: 8,
                    formatter: "{c}"
                },
                itemStyle: {
                    borderRadius: 0,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#fac858" },
                        { offset: 1, color: "#e6cb1e" }
                    ])
                }
            }
        ]
    });

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            chart.setOption(option);
        }
    }, [option]);

    return (
        <div style={{ background: 'black' }}>
            <div ref={chartRef} style={{ width: '500px', height: '300px' }}></div>
        </div>
    )
}
