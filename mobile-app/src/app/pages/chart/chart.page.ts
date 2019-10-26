import { Component, OnInit } from '@angular/core';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit {
  engines = [
    'Moto',
    'Voiture particulière',
    'Autocar',
    'Camionnette',
    'Minibus',
    'camions à 2 essieux',
    'camions à 3 essieux',
    'camions à 4 essieux',
    'camions à 5 essieux',
    'camions à 6 essieux',
    'camions à 7 essieux',
    'camions à 8 essieux',
    'camions à 9 essieux',
  ];
  constructor() { }

  ngOnInit() {
    this.plotPieChart();
    this.plotBrandChart();
  }

  setBrandSeries() {
    const data = [];
    for (let index = 0; index < 13; index++) {
      data.push(
        {
          name: this.engines[index],
          type: undefined,
          data: (new Array<number>()).fill(Math.round(Math.random() * 10), 0, 24)
        }
      );
    }
    return data;
  }

  setPieSeriesData() {
    const data = [];
    for (let index = 0; index < 13; index++) {
      data.push(
        {
          name: this.engines[index],
          y: (new Array<number>()).fill((100. / 13), 0, 13)
        }
      );
    }
    return data;
  }

  plotBrandChart() {
    const brandChart = HighCharts.chart('bandcharts', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Trafic horaire par catégorie d\'engin'
      },
      xAxis: {
        title: {
          text: 'Heures'
        },
        categories: [
          '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h',
          '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h', '24h',
        ]
      },
      yAxis: {
        title: {
          text: 'Nombres'
        }
      },
      series: this.setBrandSeries()
    });
  }

  plotPieChart() {
    const pieChart = HighCharts.chart('piecharts', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Composition par catégorie de véhicules'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Véhicules',
        colorByPoint: true,
        type: undefined,
        data: this.setPieSeriesData()
      }]
    });
  }
}
