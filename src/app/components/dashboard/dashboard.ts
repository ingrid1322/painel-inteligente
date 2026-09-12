import { DataService } from './../../services/data';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 0 auto;">
      <h2>📈 Painel de Monitoramento Inteligente</h2>

      <!-- Container do Gráfico (só carrega se houver dados para evitar travar a tela) -->
      <div *ngIf="listaPrecos.length > 0" style="display: block; margin-bottom: 30px; background: #f8f9fa; padding: 15px; border-radius: 8px;">
        <canvas baseChart
          [data]="lineChartData"
          [options]="lineChartOptions"
          [type]="lineChartType">
        </canvas>
      </div>

      <h3>📋 Histórico de Coletas</h3>
      <ul style="list-style-type: none; padding: 0;">
        <li *ngFor="let item of listaPrecos" style="padding: 8px; border-bottom: 1px solid #eee;">
          📅 <strong>{{ item.data }}</strong> - {{ item.produto }}: <span style="color: #28a745; font-weight: bold;">R$ {{ item.preco }}</span>
        </li>
      </ul>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  listaPrecos: any[] = [];

  public lineChartType: ChartType = 'line';

  // Estrutura inicial do gráfico vazia e segura
  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: { beginAtZero: false }
    }
  };

  constructor(private DataService: DataService) {}

  ngOnInit(): void {
    this.DataService.getHistorico().subscribe({
      next: (dados: any) => {
        this.listaPrecos = dados;
        if (dados && dados.length > 0) {
          this.atualizarGrafico(dados);
        }
      },
      error: (err: any) => {
        console.error('Erro ao buscar dados do Python', err);
      }
    });
  }

  atualizarGrafico(dados: any[]): void {
    const datas = dados.map(item => item.data);
    const precos = dados.map(item => item.preco);

    this.lineChartData = {
      labels: datas,
      datasets: [
        {
          data: precos,
          label: 'Histórico de Preço (R$)',
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderColor: '#28a745',
          pointBackgroundColor: '#28a745',
          fill: 'origin',
        }
      ]
    };
  }
}
