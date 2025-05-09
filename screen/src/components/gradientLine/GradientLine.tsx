import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';

export default function GradientLine() {
    const chartRef = useRef<HTMLDivElement>(null);
    const [option, setOption] = useState({
        grid: {
            left: "5%",
            right: "5%",
            top: "25%",
            bottom: "5%",
            width: "90%",
            heigth: "100%",
            containLabel: true
        },
        legend: {
            top: "4%",
            left: "5%",
            textStyle: {
                color: "#ffff",
                fontSize: 12,
                lineHeight: 20
            }
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
                shadowStyle: { opacity: 0.2 }
            },
            backgroundColor: "rgba(0,0,0,1)",
            borderWidth: 1,
            borderColor: "#999999",
            textStyle: {
                color: "#ffffff",
                fontSize: 10
            },
            extraCssText: "z-index: 9999;",
            appendToBody: true,
            formatter: function (params: any) {
                let result = `${params[0].axisValueLabel}<br/>`
                params.forEach((param: any) => {
                    const marker = param.marker
                    const seriesName = param.seriesName
                    const value = param.value
                    if (param.componentSubType === "bar") {
                        result += `${marker} ${seriesName}: ${value}<br/>`
                    } else {
                        result += `${marker} ${seriesName}: ${value}<br/>`
                    }
                })
                return result
            }
        },
        xAxis: {
            type: "category",
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
            data: ["12:00", "14:00", "17:00"]
        },
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    formatter: "{value}",
                    color: "#fff"
                }
            },
            // {
            //     type: "value",
            //     axisLabel: {
            //         formatter: "{value}",
            //         color: "#fff"
            //     }
            // }
        ],
        series: [
            {
                name: '线上销售',
                data: [16, 200, 15],
                type: "line",
                smooth: true,
                symbol:
                    "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
                symbolSize: 10,
                showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
                // yAxisIndex: 1,
                label: {
                    show: true,
                    position: "top",
                    distance: 10,
                    color: "#ffffff",
                    fontSize: 8
                },
                lineStyle: {
                    shadowColor: "rgb(0, 0, 0, 0.4)",
                    shadowBlur: 3,
                    shadowOffsetY: 10,
                    width: 3,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(21, 229, 236)"
                        },
                        {
                            offset: 1,
                            color: "rgb(19, 235, 224)"
                        }
                    ])
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(25, 227, 234, 0.4)"
                        },
                        {
                            color: "rgba(38, 176, 192, 0)",
                            offset: 1
                        }
                    ])
                }
            },
            {
                name: '线下门店',
                data: [12, 20, 150],
                type: "line",
                smooth: true,
                symbol:
                    "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==",
                symbolSize: 10,
                showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
                // yAxisIndex: 1,
                label: {
                    show: true,
                    position: "top",
                    distance: 10,
                    color: "#ffffff",
                    fontSize: 8
                },
                lineStyle: {
                    shadowColor: "rgb(0, 0, 0, 0.4)",
                    shadowBlur: 3,
                    shadowOffsetY: 10,
                    width: 3,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgb(247, 26, 225)"
                        },
                        {
                            offset: 1,
                            color: "rgb(120, 28, 105)"
                        }
                    ])
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "rgba(188, 36, 168, 0.4)"
                        },
                        {
                            color: "rgba(211, 22, 145, 0)",
                            offset: 1
                        }
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
