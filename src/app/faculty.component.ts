import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  teamMember1: {
    name: string;
    rollNo: string;
  };
  department: string;
  projectName: string;
  domain: string;
  projectType: string;
  facultyId: string;
  facultyName: string;
  status: 'Approved' | 'Rejected' | null;
}

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="faculty-container">
      <nav class="navbar">
        <div class="navbar-left">
          <span>Welcome, {{ username }}</span>
        </div>
        <div class="navbar-right">
          <button class="icon-button" (click)="toggleTheme()" title="Toggle Dark Mode">🌙</button>
          <button class="icon-button" (click)="toggleNotifications()" title="View Notifications">🔔</button>
        </div>
      </nav>

      <h2 class="faculty-title">Project Submissions</h2>
      <div class="notification" *ngIf="notification" [ngClass]="{ 'approved': notification === 'Project Approved', 'rejected': notification === 'Project Rejected' }">
        {{ notification }}
      </div>

      <!-- Project cards with extra sections on the sides -->
      <div class="project-card" *ngFor="let project of projects">
        <div class="project-content">
          <div class="extra"></div> <!-- Left extra section inside card -->

          <div class="project-details">
            <div class="detail-item">
              <strong>Team Member 1:</strong>
              <span>{{ project.teamMember1.name }}</span>
            </div>
            <div class="detail-item">
              <strong>Roll No:</strong>
              <span>{{ project.teamMember1.rollNo }}</span>
            </div>
            <div class="detail-item">
              <strong>Department:</strong>
              <span>{{ project.department }}</span>
            </div>
            <div class="detail-item">
              <strong>Project Name:</strong>
              <span>{{ project.projectName }}</span>
            </div>
            <div class="detail-item">
              <strong>Domain:</strong>
              <span>{{ project.domain }}</span>
            </div>
            <div class="detail-item">
              <strong>Project Type:</strong>
              <span>{{ project.projectType }}</span>
            </div>
            <div class="detail-item">
              <strong>Faculty ID:</strong>
              <span>{{ project.facultyId }}</span>
            </div>
            <div class="detail-item">
              <strong>Faculty Name:</strong>
              <span>{{ project.facultyName }}</span>
            </div>
          </div>
        </div>

        <div class="action-buttons" *ngIf="!project.status">
          <button (click)="approveProject(project)" class="approve-btn">Approve</button>
          <button (click)="rejectProject(project)" class="reject-btn">Reject</button>
        </div>

        <div *ngIf="project.status" class="status-message">
          <span [ngClass]="{ 'approved': project.status === 'Approved', 'rejected': project.status === 'Rejected' }">
            {{ project.status }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

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
      color: black;
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.3s ease, color 0.3s ease;
    }

    .icon-button:hover {
      color: #00509e;
      transform: scale(1.1);
    }

    .faculty-container {
      font-family: 'Poppins', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: lightblue;
      min-height: 100vh;
    }

    .faculty-title {
      font-size: 32px;
      color: #00509e;
      margin-bottom: 20px;
      font-weight: 600;
      text-align: center;
    }

    .project-card {
      background-color: white;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      width: 80%;
    }

    .project-content {
      display: grid;
      grid-template-columns: 1fr 3fr 1fr; /* Adjust widths: 1 part extra div, 3 parts for content */
      gap: 20px;
    }

    .extra {
      background: url('/logo.png');
      background-size: 80% 80%; /* Adjust as needed */
      background-repeat: no-repeat; /* Adjust as needed */   
      margin-top:30px;   
      margin-left:20px;
      border-radius:10px;
    }

    .project-details {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-left:100px;
    }

    .detail-item {
      font-size: 16px;
      color: #333;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 20px;
    }

    .approve-btn, .reject-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease, transform 0.3s ease;
    }

    .approve-btn {
      background-color: #28a745;
      color: white;
      margin-left:50%;
    }

    .approve-btn:hover {
      background-color: #218838;
      transform: scale(1.05);
    }

    .reject-btn {
      background-color: #dc3545;
      color: white;
    }

    .reject-btn:hover {
      background-color: #c82333;
      transform: scale(1.05);
    }

    .status-message {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

    .approved {
      color: green;
    }

    .rejected {
      color: red;
    }

    .notification {
      margin-top: 20px;
      background:white;
      padding: 10px;
      border-radius: 8px;
      font-size: 18px;
      text-align: center;
      width: 80%;
      max-width: 600px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class FacultyComponent {
  projects: Project[] = [
    {
      teamMember1: { name: 'John Doe', rollNo: '1234567CS' },
      department: 'Computer Science',
      projectName: 'Real-Time Tracking System',
      domain: 'Web Development',
      projectType: 'Internal',
      facultyId: 'CS001',
      facultyName: 'Dr. Smith',
      status: null
    },
    {
      teamMember1: { name: 'Jane Doe', rollNo: '1234568CS' },
      department: 'Computer Science',
      projectName: 'AI Chatbot',
      domain: 'Artificial Intelligence',
      projectType: 'External',
      facultyId: 'CS002',
      facultyName: 'Dr. Johnson',
      status: null
    }
  ];

  notification: string | null = null;

  approveProject(project: Project) {
    project.status = 'Approved';
    this.notification = 'Project Approved';
    setTimeout(() => (this.notification = null), 3000);
  }

  rejectProject(project: Project) {
    project.status = 'Rejected';
    this.notification = 'Project Rejected';
    setTimeout(() => (this.notification = null), 3000);
  }

  username: string = 'User';
  showNotifications: boolean = false;

  toggleTheme() {
    document.body.classList.toggle('dark-mode');
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
