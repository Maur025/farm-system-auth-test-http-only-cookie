import { Component, inject, OnInit, signal } from '@angular/core';
import { HomeService } from './home.service';
import { LogginService } from '../loggin/loggin.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly logginService = inject(LogginService);

  public message = signal('Funciona el loggin, bienvenido a home');

  ngOnInit(): void {
    this.findData();
  }

  findData(): void {
    this.homeService.findAllActivities().subscribe({
      next: (response) => {
        console.log('Activities fetched successfully', response);
        this.message.set(
          'OK: autenticacion correcta y aun valida, tienes acceso a las actividades'
        );
      },
      error: () => {
        console.error('Error fetching activities');
        this.message.set('ERROR: Fallo la autenticacion, no tienes acceso a las actividades');
      },
    });
  }

  reloadData(): void {
    this.findData();
  }
}
