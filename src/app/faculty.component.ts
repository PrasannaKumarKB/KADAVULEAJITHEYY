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
      <!-- Header Section -->
      <header class="header">
      <div class="header-logo">
        <img src="logo.png" alt="College Logo" />
      </div>
      <div class="header-info">
        <div class="header-title">OFFICE ACADEMICS</div>
        <div class="header-college-name">Bannari Amman Institute of Technology</div>
        <div class="header-address">Sathyamangalam, Erode - 638 401</div>
        <div class="header-contact">
          <span>T: 04295 226584</span>
          <span>M: officeacademics&#64;bitsathy.ac.in</span>
        </div>
      </div>
    </header>
    

      <nav class="navbar">
        <div class="navbar-left">
          <span>Welcome, {{ username }}</span>
        </div>
        <div class="navbar-right">
          <button class="icon-button" (click)="toggleTheme()" title="Toggle Dark Mode">🌙</button>
          <button class="icon-button" (click)="toggleNotifications()" title="View Notifications">🔔</button>
        </div>
      </nav>

      <div class="content-grid">
        <!-- Submissions Section -->
        <div class="submissions-section">
          <h2 class="section-title">Project Submissions</h2>
          <div class="project-card" *ngFor="let project of projects" (click)="selectProject(project)">
            <div class="project-summary">
              <strong>{{ project.projectName }}</strong>
              <p>{{ project.department }} - {{ project.projectType }}</p>
            </div>
            <div class="status-label" *ngIf="project.status">
              <span [ngClass]="{ 'approved': project.status === 'Approved', 'rejected': project.status === 'Rejected' }">
                {{ project.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Selected Project Result Section -->
        <div class="result-section" *ngIf="selectedProject">
          <h2 class="section-title">Project Details</h2>
          <div class="project-details">
            <div class="detail-item">
              <strong>Team Member 1:</strong> {{ selectedProject.teamMember1.name }}
            </div>
            <div class="detail-item">
              <strong>Roll No:</strong> {{ selectedProject.teamMember1.rollNo }}
            </div>
            <div class="detail-item">
              <strong>Department:</strong> {{ selectedProject.department }}
            </div>
            <div class="detail-item">
              <strong>Project Name:</strong> {{ selectedProject.projectName }}
            </div>
            <div class="detail-item">
              <strong>Domain:</strong> {{ selectedProject.domain }}
            </div>
            <div class="detail-item">
              <strong>Project Type:</strong> {{ selectedProject.projectType }}
            </div>
            <div class="detail-item">
              <strong>Faculty ID:</strong> {{ selectedProject.facultyId }}
            </div>
            <div class="detail-item">
              <strong>Faculty Name:</strong> {{ selectedProject.facultyName }}
            </div>
          </div>

          <div class="action-buttons" *ngIf="!selectedProject.status">
            <button (click)="approveProject(selectedProject)" class="approve-btn">Approve</button>
            <button (click)="rejectProject(selectedProject)" class="reject-btn">Reject</button>
          </div>

          <div *ngIf="selectedProject.status" class="status-message">
            <span [ngClass]="{ 'approved': selectedProject.status === 'Approved', 'rejected': selectedProject.status === 'Rejected' }">
              {{ selectedProject.status }}
            </span>
          </div>
        </div>
      </div>

      <div class="notification" *ngIf="notification">
        {{ notification }}
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    .faculty-container {
      font-family: 'Poppins', sans-serif;
      background: #add8e6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Header styling */
.header {
  display: flex;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  border: 5px solid;
}

.header-logo img {
  height: 120px; /* Adjust the height as needed */
  margin-right: 20px;

}

.header-info {
  text-align: center;
  margin-left:26%;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: #00509e;
}

.header-college-name {
  font-size: 20px;
  font-weight: 600;
  margin: 5px 0;
}

.header-address, .header-contact {
  font-size: 16px;
  margin: 3px 0;
  color: #333;
}

    /* Navbar styling */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      padding: 15px 30px;
      background-color: #ffffff;
      color: black;
      border-radius: 10px;
      margin-bottom: 30px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 10;
      border:5px solid;
    }

    .navbar-left {
      font-size: 22px;
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
      color: #ffd700;
      transform: scale(1.1);
    }

    /* Content grid styling */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 30px;
      width: 100%;
      max-width: 1200px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border:5px solid;
    }

    /* Submissions Section */
    .submissions-section {
      background-color: #f7faff;
      border-radius: 12px;
      padding: 20px;
    }

    .section-title {
      font-size: 24px;
      color: #00509e;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 600;
    }

    .project-card {
      background-color: white;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 15px;
      border: 3px solid #ddd;
      cursor: pointer;
      transition: 0.3s ease;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .project-card:hover {
      background-color: #f0f8ff;
    }

    .project-summary {
      font-size: 16px;
      font-weight: 600;
    }

    .status-label {
      font-size: 14px;
      text-align: right;
    }

    .approved {
      color: #28a745;
    }

    .rejected {
      color: #dc3545;
    }

    /* Result Section */
    .result-section {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .project-details {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .detail-item {
      font-size: 16px;
      color: #333;
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 20px;
    }

    .approve-btn, .reject-btn {
      padding: 10px 25px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .approve-btn {
      background-color: #28a745;
      color: white;
    }

    .approve-btn:hover {
      background-color: #218838;
    }

    .reject-btn {
      background-color: #dc3545;
      color: white;
    }

    .reject-btn:hover {
      background-color: #c82333;
    }

    .status-message {
      text-align: center;
      font-size: 18px;
      margin-top: 20px;
    }

    .notification {
      margin-top: 20px;
      background-color: #e0f7fa;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #b2ebf2;
      color: #00796b;
      font-weight: 600;
    }
  `]
})
export class FacultyComponent {
  username = 'Faculty Member'; // Replace with actual username
  projects: Project[] = [
    {
      teamMember1: { name: 'John Doe', rollNo: '1234567' },
      department: 'Computer Science',
      projectName: 'AI Project',
      domain: 'Artificial Intelligence',
      projectType: 'Internal',
      facultyId: 'AB12345',
      facultyName: 'Dr. Smith',
      status: null
    },
    // Add more project details as needed
  ];

  selectedProject: Project | null = null;
  notification: string | null = null;

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  approveProject(project: Project) {
    project.status = 'Approved';
    this.notification = 'Project Approved';
  }

  rejectProject(project: Project) {
    project.status = 'Rejected';
    this.notification = 'Project Rejected';
  }

  toggleTheme() {
    // Logic for toggling dark mode
  }

  toggleNotifications() {
    // Logic for displaying notifications
  }
}
