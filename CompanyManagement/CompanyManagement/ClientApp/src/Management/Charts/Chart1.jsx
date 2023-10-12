import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as AmCharts from '@amcharts/amcharts3-react';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {useEffect, useRef } from "react";
import "./Chart1.css";

am4core.useTheme(am4themes_animated);

export default function Chart1() {
    const chartRef = useRef(null);
    
    useEffect(() => {
        // Add data
        const chartValues = [
            {
                "date": "2023-09-27",
                "income": 227,
                "townName": "Salary",
                "townName2": "Salary",
                "townSize": 25,
                "issuance": 40.71,
                "duration": 408
            },
            {
                "date": "2023-09-28",
                "income": 371,
                "townName": "",
                "townSize": 14,
                "issuance": 38.89,
                "duration": 482
            },
            {
                "date": "2023-09-29",
                "income": 433,
                "townName": "",
                "townSize": 6,
                "issuance": 34.22,
                "duration": 562
            },
            {
                "date": "2023-09-30",
                "income": 345,
                "townName": "",
                "townSize": 7,
                "issuance": 30.35,
                "duration": 379
            },
            {
                "date": "2023-10-01",
                "income": 480,
                "townName": "Internet Bill",
                "townName2": "Internet Bill",
                "townSize": 10,
                "issuance": 25.83,
                "duration": 501
            },
            {
                "date": "2023-10-02",
                "income": 386,
                "townName": "",
                "townSize": 7,
                "issuance": 30.46,
                "duration": 443
            },
            {
                "date": "2023-10-03",
                "income": 348,
                "townName": "",
                "townSize": 10,
                "issuance": 29.94,
                "duration": 405
            },
            {
                "date": "2023-10-04",
                "income": 238,
                "townName": "Accounting Fee",
                "townName2": "Accounting Fee",
                "townSize": 16,
                "issuance": 29.76,
                "duration": 309
            },
            {
                "date": "2023-10-05",
                "income": 218,
                "townName": "",
                "townSize": 17,
                "issuance": 32.8,
                "duration": 287
            },
            {
                "date": "2023-10-06",
                "income": 349,
                "townName": "",
                "townSize": 11,
                "issuance": 35.49,
                "duration": 485
            },
            {
                "date": "2023-10-07",
                "income": 603,
                "townName": "",
                "townSize": 10,
                "issuance": 39.1,
                "duration": 890
            },
            {
                "date": "2023-10-08",
                "income": 534,
                "townName": "Rent",
                "townName2": "Rent",
                "townSize": 18,
                "issuance": 41,
                "duration": 810
            },
            {
                "date": "2023-10-09",
                "townName": "",
                "townSize": 12,
                "income": 425,
                "duration": 670,
                "issuance": 40.75,
                "alpha":0.4
            },
            {
                "date": "2023-10-10",
                "issuance": 36.1,
                "duration": 470,
                "townName": "Electricity Bill",
                "townName2": "Electricity Bill",
                "bulletClass": "lastBullet"
            },
            {
                "date": "2023-10-11"
            },
            {
                "date": "2023-10-12"
            }
        ];

        chartRef.current = AmCharts.makeChart("chartdiv", {
            type: "serial",
            theme: "dark",
            dataDateFormat: "YYYY-MM-DD",
            dataProvider: chartValues,

            addClassNames: true,
            startDuration: 1,
            color: "#FFFFFF",
            marginLeft: 0,

            categoryField: "date",
            categoryAxis: {
                parseDates: true,
                minPeriod: "DD",
                autoGridCount: false,
                gridCount: 50,
                gridAlpha: 0.1,
                gridColor: "#FFFFFF",
                axisColor: "#555555",
                dateFormats: [{
                    period: 'DD',
                    format: 'DD'
                }, {
                    period: 'WW',
                    format: 'MMM DD'
                }, {
                    period: 'MM',
                    format: 'MMM'
                }, {
                    period: 'YYYY',
                    format: 'YYYY'
                }]
            },

            valueAxes: [{
                id: "a1",
                title: "income",
                gridAlpha: 0,
                axisAlpha: 0
            },{
                id: "a2",
                position: "right",
                gridAlpha: 0,
                axisAlpha: 0,
                labelsEnabled: false
            },{
                id: "a3",
                title: "working hours",
                position: "right",
                gridAlpha: 0,
                axisAlpha: 0,
                inside: true,
                duration: "mm",
                durationUnits: {
                    DD: "d. ",
                    hh: "h ",
                    mm: "min",
                    ss: ""
                }
            }],
            graphs: [{
                id: "g1",
                valueField:  "income",
                title:  "income",
                type:  "column",
                fillAlphas:  0.9,
                valueAxis:  "a1",
                balloonText:  "[[value]] $",
                legendValueText:  "[[value]] $",
                legendPeriodValueText:  "total: [[value.sum]] $",
                lineColor:  "#263138",
                alphaField:  "alpha",
            },{
                id: "g2",
                valueField: "issuance",
                classNameField: "bulletClass",
                title: "issuance",
                type: "line",
                valueAxis: "a2",
                lineColor: "#786c56",
                lineThickness: 1,
                legendValueText: "[[description]] : [[value]]$",
                descriptionField: "townName",
                bullet: "round",
                bulletSizeField: "townSize",
                bulletBorderColor: "#786c56",
                bulletBorderAlpha: 1,
                bulletBorderThickness: 2,
                bulletColor: "#000000",
                labelText: "[[townName2]]",
                labelPosition: "right",
                balloonText: "issuance:[[value]]$",
                showBalloon: true,
                animationPlayed: true,
            },{
                id: "g3",
                title: "working hours",
                valueField: "duration",
                type: "line",
                valueAxis: "a3",
                lineColor: "#ff5755",
                balloonText: "[[value]]",
                lineThickness: 1,
                legendValueText: "[[value]]",
                bullet: "square",
                bulletBorderColor: "#ff5755",
                bulletBorderThickness: 1,
                bulletBorderAlpha: 1,
                dashLengthField: "dashLength",
                animationPlayed: true
            }],

            chartCursor: {
                zoomable: false,
                categoryBalloonDateFormat: "DD",
                cursorAlpha: 0,
                valueBalloonsEnabled: false
            },
            legend: {
                bulletType: "round",
                equalWidths: false,
                valueWidth: 120,
                useGraphSettings: true,
                color: "#FFFFFF"
            }
        });

        /*
        // Create chart instance
        let chart = am4core.create('chartdiv', am4charts.XYChart);

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'category';

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.categoryX = 'category';
        series.name = 'Series 1';

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        */
    }, []);
    
    return (
        <>
            <span className="chart1-label">Financial income and working hours statement</span>
            <div id="chartdiv" style={{ position: 'absolute', width: '85%', height: '500px', borderRadius: '10px', top: '80px', left: '50%', transform: 'translateX(-50%)' }}></div>
        </> 
    );
}