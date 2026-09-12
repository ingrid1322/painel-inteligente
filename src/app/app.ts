import { Component, signal } from '@angular/core';
import { DashboardComponent } from "./components/dashboard/dashboard";
import { AlertFormComponent } from "./components/alert-form/alert-form";

@Component({
  imports: [DashboardComponent, AlertFormComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('painel-inteligente');
}
