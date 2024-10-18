import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="body">
      <div class="container">
        <nav class="navbar">
          <div class="navbar-left">
            <span>Welcome, {{ userName }}!</span> <!-- Updated to use userName from AuthService -->
          </div>
          <div class="navbar-right">
            <button class="icon-button" (click)="toggleTheme()" title="Toggle Dark Mode">🌙</button>
            <button class="icon-button" (click)="toggleNotifications()" title="View Notifications">🔔</button>
          </div>
        </nav>
        
        <main>
          <h2 class="project-title">Registration Portal</h2>
          <div class="options">
            <div class="option-box" (click)="openProjectChoiceModal()">
              <h2>Registration Form</h2>
              <p>Fill out your project details</p>
            </div>
            <div class="option-box" (click)="goToStatus()">
              <h2>Registration Status</h2>
              <p>Check the status of your application</p>
            </div>
          </div>
        </main>
        
        <footer class="footer">
          <p>© Bannari Amman Institute of Technology, 2024. All Rights Reserved.</p>
        </footer>
        
        <!-- Notifications Modal -->
        <div class="modal" *ngIf="showNotifications">
          <div class="modal-content">
            <span (click)="toggleNotifications()" class="close-button">&times;</span>
            <h3>Notifications</h3>
            <ul>
              <li *ngFor="let notification of notifications">{{ notification }}</li>
            </ul>
          </div>
        </div>

        <!-- Project Choice Modal -->
        <div class="modal" *ngIf="showProjectChoice">
          <div class="modal-content">
            <span (click)="closeProjectChoiceModal()" class="close-button">&times;</span>
            <h3>Select Project Type</h3>
            <p>Are you choosing an Internal or External Project?</p>
            <div class="button-group">
              <button (click)="navigateToInternal()" class="project-button">Internal Project</button>
              <button (click)="navigateToExternal()" class="project-button">External Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    body {
      font-family: 'Poppins', sans-serif;
      margin: 0;
      padding: 0;
      background: lightblue;
      color: #333;
      transition: background-color 0.3s, color 0.3s;
    }

    body.dark-mode {
      background-color: #1a1a1a;
      color: #f0f0f0;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      min-height:100vh;
      background:lightblue;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      padding: 15px 30px;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      color: black;
      border-radius: 10px;
      margin-bottom: 30px;
    }

    .navbar-left {
      font-size: 20px;
      font-weight: 600;
    }

    .navbar-right {
      display: flex;
      gap: 20px;
    }

    .icon-button {
      background: transparent;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    .icon-button:hover {
      color: #e0e0e0;
      transform: scale(1.1);
    }

    .project-title {
      font-size: 32px;
      color: #00509e;
      margin-bottom: 40px;
      text-align: center;
      font-weight: 600;
    }

    .options {
      display: flex;
      justify-content: center;
      gap: 50px;
      flex-wrap: wrap;
    }

    .option-box {
      width: 300px;
      height: 200px;
      border-radius: 15px;
      background: linear-gradient(145deg, #ffffff, #f4f7f9);
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      padding: 20px;
      text-align: center;
    }

    .option-box:hover {
      transform: translateY(-10px);
      box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15);
    }

    .option-box h2 {
      font-size: 24px;
      color: #00509e;
      margin: 0;
    }

    .option-box p {
      font-size: 16px;
      color: #666;
    }

    .footer {
      text-align: center;
      color: #888;
      margin-top: auto;
      padding: 20px 0;
      font-size: 14px;
    }

    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      overflow-y: auto;
    }

    .modal-content {
      background-color: white;
      border-radius: 15px;
      padding: 20px 30px;
      width: 400px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      position: relative;
      text-align: center;
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
      font-size: 20px;
      color: #888;
      transition: color 0.3s ease;
    }

    .close-button:hover {
      color: #000;
    }

    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }

    .project-button {
      background-color: #00509e;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      width: 48%;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .project-button:hover {
      background-color: #003f7e;
      transform: translateY(-2px);
    }
  `],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  userName: string = '';

  showNotifications: boolean = false;
  notifications: string[] = ['Notification 1', 'Notification 2', 'Notification 3'];
  showProjectChoice: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName(); // Fetch the user's name from AuthService
  }

  openProjectChoiceModal() {
    this.showProjectChoice = true;
  }

  closeProjectChoiceModal() {
    this.showProjectChoice = false;
  }

  navigateToInternal() {
    this.router.navigate(['/internal']);
    this.closeProjectChoiceModal();
  }

  navigateToExternal() {
    this.router.navigate(['/external']);
    this.closeProjectChoiceModal();
  }

  goToStatus() {
    this.router.navigate(['/status']);
  }

  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
