import { Component, Listen, State } from '@stencil/core';
import Chart from 'chart.js';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {
  pieChartCanvasEl: HTMLCanvasElement;

  @Listen('ionChange')
  onInputChange(event) {
    this.formData[event.path[0].name] = event.detail.value;
  }

  @State()
  formData: {
    amount?: string,
    label?: string
  } = {};
  @State()
  pieChart: Chart;
  @State()
  pieData = {
    datasets: [
      {
        data: ['10', '20', '30'],
        backgroundColor: [
          'red', 'yellow', 'blue'
        ]
      }
    ],
    labels: ['Red', 'Yellow', 'Blue'],
  };

  componentDidLoad() {
    this.pieChart = new Chart(this.pieChartCanvasEl, {
      type: 'pie',
      data: this.pieData
    });
  }

  save () {
    console.log(this.formData);
    if (!this.formData.amount || !this.formData.label) {
      alert('You must enter in both an amount and a label!');

      return false;
    }

    this.pieData.datasets[0].data.push(this.formData.amount);
    this.pieData.datasets[0].backgroundColor.push(this.formData.label);
    this.pieData.labels.push(this.formData.label);
    this.pieChart.update();
    this.formData = {};
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
        <ion-card>
          <canvas id="pie-chart" width="400" height="400" ref={(el: HTMLCanvasElement) => this.pieChartCanvasEl = el}></canvas>
          <ion-input type="number" placeholder="Amount" name="amount" value={this.formData.amount} />
          <ion-input type="text" placeholder="Label / Color" name="label" value={this.formData.label} />
          <ion-button type="submit" color="success" fill="solid" onClick={() => this.save()}>Save</ion-button>
        </ion-card>
      </ion-content>
    ];
  }
}
