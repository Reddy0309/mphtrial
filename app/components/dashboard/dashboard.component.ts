import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { RouterModule,Router } from '@angular/router';
import { NavComponent } from "../nav/nav.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [BaseChartDirective]
})
export class DashboardComponent implements OnInit {
  showDetailedChart: 'performance' | 'allocation' | null = null;

  constructor(private router: Router, private userService: UserService) {} 

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      // If email is not found, redirect to login
      this.router.navigate(['/login']);
    }
  }

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [300000, 350000, 400000, 420000, 434000],
        label: 'Portfolio Value',
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
 
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };
 
  doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Equity', 'Debt', 'Gold'],
    datasets: [
      {
        data: [96.93, 2.5, 0.57],
        backgroundColor: ['#007bff', '#dc3545', '#ffc107']
      }
    ]
  };
 
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
 
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};

public performancePieChartData: ChartData<'pie', number[], string | string[]> = {
  labels: ['Equity', 'Debt', 'Gold', 'Cash'],
  datasets: [
    {
      data: [40, 25, 20, 15],
      backgroundColor: ['#4CAF50', '#FF9800', '#FFEB3B', '#2196F3']
    }
  ]
};

public allocationPieChartData: ChartData<'pie', number[], string | string[]> = {
  labels: ['Large Cap', 'Mid Cap', 'Small Cap'],
  datasets: [
    {
      data: [50, 30, 20],
      backgroundColor: ['#3f51b5', '#009688', '#e91e63']
    }
  ]
};
 
  showChart(type: 'performance' | 'allocation') {
    this.showDetailedChart = type;
  }

  closeChart() {
    this.showDetailedChart = null;
  }

  // Placeholder methods for refresh and logout actions
  refreshPrices() {
    console.log('Prices refreshed');
  }
 
  logout() {
    localStorage.clear();   
    this.userService.clearEmail();
    this.router.navigate(['']);  
  }
 
  // Placeholder properties for top holdings table
  loading = false;
  error = '';
  investments = [
    { ticker: 'AAPL', quantity: 10, purchasePrice: 150, currentPrice: 170, currentValue: 1700, change: 200, changePercentage: 13.33 },
    { ticker: 'GOOGL', quantity: 5, purchasePrice: 1000, currentPrice: 1100, currentValue: 5500, change: 500, changePercentage: 10 },
    { ticker: 'MSFT', quantity: 15, purchasePrice: 200, currentPrice: 250, currentValue: 3750, change: 750, changePercentage: 37.5 }
  ];
}