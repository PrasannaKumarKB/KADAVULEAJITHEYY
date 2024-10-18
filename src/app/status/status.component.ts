import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="body">
    
    <div class="status-container">
    <nav class="navbar">
      <div class="navbar-left">
        <span>Welcome, {{ username }}</span>
      </div>
      <div class="navbar-right">
        <button class="icon-button" (click)="toggleTheme()" title="Toggle Dark Mode">🌙</button>
        <button class="icon-button" (click)="toggleNotifications()" title="View Notifications">🔔</button>
      </div>
    </nav>
      <h2 class="status-title">Registration Status</h2>
      <div class="status-card">
        <h3>Project Details</h3>
        <div class="details">
          <div class="detail-item">
            <strong>Team ID:</strong>
            <span>{{ teamId }}</span>
          </div>
          <div class="detail-item">
            <strong>Team Member 1:</strong>
            <span>{{ teamMember1 }}</span>
          </div>
          <div class="detail-item">
            <strong>Project Type:</strong>
            <span>{{ projectType }}</span>
          </div>
          <div class="detail-item">
            <strong>Faculty Guide:</strong>
            <span>{{ facultyGuide }}</span>
          </div>
          <div class="detail-item">
            <strong>Status:</strong>
            <span [ngClass]="{ 'approved': status === 'Approved', 'rejected': status === 'Rejected' }">{{ status }}</span>
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
      display:flex;
      justify-content:normal;
    }

    .status-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: lightblue;
      min-height: 100vh;
    }

    .status-title {
      font-size: 32px;
      color: #00509e;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 600;
    }

    .status-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      padding: 20px;
      width: 90%;
      max-width: 600px;
      margin: 20px 0;
    }

    .details {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #555;
    }

    .approved {
      color: green;
      font-weight: 600;
    }

    .rejected {
      color: red;
      font-weight: 600;
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
      color: black; /* Change color to black for visibility */
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    .icon-button:hover {
      color: #e0e0e0;
      transform: scale(1.1);
    }
  `]
})
export class StatusComponent {
  teamId: string = 'T123456'; // Example Team ID
  teamMember1: string = 'John Doe'; // Example Team Member Name
  projectType: string = 'Internal'; // Example Project Type
  facultyGuide: string = 'Dr. Smith'; // Example Faculty Guide Name
  status: string = 'Rejected'; // Example Status

  username: string = 'User'; // Placeholder for actual username
  showNotifications: boolean = false; // Flag to show/hide notifications
  notifications: string[] = ['Notification 1', 'Notification 2', 'Notification 3'];

  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications; 
  }
}
