import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { MatCardModule } from '@angular/material/card';

interface PerformanceData {
  month: string;
  score: number;
}

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  template: `
    <mat-card>
      <h3>Performance Trend</h3>
      <div #chart></div>
    </mat-card>
  `,
  styles: [`
    mat-card {
      padding: 16px;
    }
  `]
})
export class PerformanceChartComponent implements AfterViewInit {

  @ViewChild('chart', { static: true }) chart!: ElementRef;

  // Later you can pass this from dashboard
  @Input() data: PerformanceData[] = [
    { month: 'Jan', score: 70 },
    { month: 'Feb', score: 75 },
    { month: 'Mar', score: 80 },
    { month: 'Apr', score: 78 },
    { month: 'May', score: 85 }
  ];

  ngAfterViewInit(): void {
    this.drawChart();
  }

  private drawChart(): void {
    const element = this.chart.nativeElement;

    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X scale
    const x = d3.scalePoint()
      .domain(this.data.map(d => d.month))
      .range([0, width]);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.score)!])
      .nice()
      .range([height, 0]);

    // X Axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Y Axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Line
    const line = d3.line<PerformanceData>()
      .x(d => x(d.month)!)
      .y(d => y(d.score));

    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', '#3f51b5')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Dots
    svg.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.month)!)
      .attr('cy', d => y(d.score))
      .attr('r', 4)
      .attr('fill', '#3f51b5');
  }
}
