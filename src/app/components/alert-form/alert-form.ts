import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-alert-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div style="padding: 20px; font-family: sans-serif; max-width: 800px; margin: 20px auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h3 style="margin-top: 0; color: #333;">🔔 Configurar Alerta de Preço</h3>
      <p style="color: #666; font-size: 14px;">Receba um e-mail automaticamente quando o produto atingir o preço desejado.</p>

      <form [formGroup]="alertaForm" (ngSubmit)="enviarAlerta()" style="display: flex; flex-direction: column; gap: 15px;">

        <!-- Campo de E-mail -->
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #444;">Seu E-mail:</label>
          <input type="email" formControlName="email" placeholder="exemplo@email.com"
                 style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
          <div *ngIf="alertaForm.get('email')?.invalid && alertaForm.get('email')?.touched" style="color: #dc3545; font-size: 12px; margin-top: 5px;">
            Por favor, insira um e-mail válido.
          </div>
        </div>

        <!-- Campo de Preço Alvo -->
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #444;">Avisar quando o preço for menor que (R$):</label>
          <input type="number" formControlName="precoAlvo" placeholder="Ex: 300"
                 style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
          <div *ngIf="alertaForm.get('precoAlvo')?.invalid && alertaForm.get('precoAlvo')?.touched" style="color: #dc3545; font-size: 12px; margin-top: 5px;">
            Insira um valor maior que zero.
          </div>
        </div>

        <!-- Botão de Envio -->
        <button type="submit" [disabled]="alertaForm.invalid"
                style="background: #007bff; color: white; border: none; padding: 12px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 16px;">
          Ativar Monitoramento
        </button>

      </form>
    </div>
  `
})
export class AlertFormComponent {
  // Esta variável DEVE se chamar exatamente alertaForm (tudo minúsculo) para bater com o template acima
  alertaForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    precoAlvo: new FormControl('', [Validators.required, Validators.min(1)])
  });

  enviarAlerta() {
    if (this.alertaForm.valid) {
      console.log('Dados do alerta:', this.alertaForm.value);
      alert('Alerta configurado com sucesso!');
      this.alertaForm.reset();
    }
  }
}
