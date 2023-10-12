import "./Chart2.css";
import {useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import {Theme as am5themes_Animated} from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";


export default function Chart2() {
    const chartRef = useRef(null);

    useEffect(() => {
        let root = am5.Root.new("chart2div");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                layout: root.verticalLayout
            })
        );

        // Define data
        let data = [{
            age: "18-25",
            amount: 10
        }, {
            age: "25-35",
            amount: 8
        }, {
            age: "35-45",
            amount: 4
        }];

        // Create series
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                name: "Series",
                valueField: "amount",
                categoryField: "age"
            })
        );
        series.data.setAll(data);

        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.horizontalLayout
        }));

        legend.data.setAll(series.dataItems);
    }, []);

    return (            
        <div id="chart2div" className="chart2div">
            <span className="chart2-label">Age distribution</span>
        </div>
    );
}