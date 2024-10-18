import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-container">
      <h2>Admin Dashboard</h2>
      <div class="grid-container">
        <div class="option-box" (click)="showStudentAccountForm()">
          <span>Access Student Account</span>
        </div>
        <div class="option-box" (click)="showFacultyAccountForm()">
          <span>Access Faculty Account</span>
        </div>
        <div class="option-box" (click)="navigateTo('studentsList')">
          <span>Overall Students List</span>
        </div>
        <div class="option-box" (click)="navigateTo('registrationStatus')">
          <span>Registered/Not Registered Students List</span>
        </div>
        <div class="option-box" (click)="navigateTo('statusList')">
          <span>Status of Registration List</span>
        </div>
        <div class="option-box" (click)="navigateTo('settings')">
          <span>Settings (Title, Guide Limit, Team Size)</span>
        </div>
      </div>

      <!-- Modal for Student Account Form -->
      <div class="modal" *ngIf="showStudentForm">
        <div class="modal-content">
          <h3>Access Student Account</h3>
          <form (submit)="submitStudentAccountForm()">
            <div class="form-group">
              <label for="rollNo">Student Roll No:</label>
              <input type="text" id="rollNo" [(ngModel)]="studentRollNo" name="rollNo" required pattern="^[0-9]{7}[A-Za-z]{2}[0-9]{3}$" />
              <div *ngIf="rollNoError" class="error">Invalid Roll No format. It should be 7 numbers, 2 letters, and 3 numbers.</div>
            </div>
            <div class="form-group">
              <label for="adminPassword">Admin Password:</label>
              <input type="password" id="adminPassword" [(ngModel)]="adminPassword" name="adminPassword" required />
            </div>
            <div class="form-actions">
              <button type="submit">Submit</button>
              <button type="button" (click)="closeForm()">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Modal for Faculty Account Form -->
      <div class="modal" *ngIf="showFacultyForm">
        <div class="modal-content">
          <h3>Access Faculty Account</h3>
          <form (submit)="submitFacultyAccountForm()">
            <div class="form-group">
              <label for="facultyId">Faculty ID:</label>
              <input type="text" id="facultyId" [(ngModel)]="facultyId" name="facultyId" required pattern="^[A-Za-z]{2}[0-9]{5}$" />
              <div *ngIf="facultyIdError" class="error">Invalid Faculty ID format. It should be 2 letters followed by 5 numbers.</div>
            </div>
            <div class="form-group">
              <label for="adminPassword">Admin Password:</label>
              <input type="password" id="adminPassword" [(ngModel)]="adminPassword" name="adminPassword" required />
            </div>
            <div class="form-actions">
              <button type="submit">Submit</button>
              <button type="button" (click)="closeForm()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #add8e6;
        color: #fff;
        font-family: poppins;
        padding: 20px;
      }
  
      h2 {
        font-size: 36px;
        margin-bottom: 40px;
        text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
        letter-spacing: 1px;
      }
  
      .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        width: 100%;
        max-width: 1200px;
        padding: 10px;
      }
  
      .option-box {
        position: relative;
        height: 200px;
        background:#0076ea;
        color: #fff;
        text-align: center;
        border-radius: 15px;
        border: 5px solid;
        cursor: pointer;
        font-size: 22px;
        font-weight: 700;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        transition: all 0.4s ease;
        overflow: hidden;
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
  
      .option-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: -75%;
        width: 50%;
        height: 100%;
        background: #0076ea;
        transform: skewX(-25deg);
        transition: all 0.5s ease;
      }
  
      .option-box:hover::before {
        left: 125%;
      }
  
      .option-box:hover {
        background: transparent;
        transform: translateY(-10px);
        border: 2px solid #fff;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
      }
  
      .option-box span {
        position: relative;
        z-index: 1;
      }
  
  
      /* Modal Styling */
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
  
      .modal-content {
        background: #fff;
        color: #333;
        border-radius: 8px;
        padding: 30px;
        width: 90%;
        max-width: 500px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      }
  
      .modal-content h3 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #0f2027;
      }
  
      .form-group {
        margin-bottom: 15px;
        text-align: left;
      }
  
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
  
      .form-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
  
      .error-message {
        color: red;
        font-size: 14px;
        margin-top: 5px;
      }
  
      .form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
  
      .form-actions button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }
  
      .form-actions button[type="submit"] {
        background: #0f2027;
        color: #fff;
      }
  
      .form-actions button[type="button"] {
        background: #ccc;
        color: #333;
      }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
  `]
})
export class AdminComponent {
  showStudentForm = false;
  showFacultyForm = false;
  studentRollNo = '';
  facultyId = '';
  adminPassword = '';
  rollNoError = false;
  facultyIdError = false;

  showStudentAccountForm() {
    this.showStudentForm = true;
    this.showFacultyForm = false;
  }

  showFacultyAccountForm() {
    this.showFacultyForm = true;
    this.showStudentForm = false;
  }

  closeForm() {
    this.showStudentForm = false;
    this.showFacultyForm = false;
    this.studentRollNo = '';
    this.facultyId = '';
    this.adminPassword = '';
    this.rollNoError = false;
    this.facultyIdError = false;
  }

  submitStudentAccountForm() {
    this.rollNoError = !/^[0-9]{7}[A-Za-z]{2}[0-9]{3}$/.test(this.studentRollNo);
    if (!this.rollNoError && this.adminPassword) {
      console.log('Student Account Accessed:', this.studentRollNo);
      this.closeForm();
    }
  }

  submitFacultyAccountForm() {
    this.facultyIdError = !/^[A-Za-z]{2}[0-9]{5}$/.test(this.facultyId);
    if (!this.facultyIdError && this.adminPassword) {
      console.log('Faculty Account Accessed:', this.facultyId);
      this.closeForm();
    }
  }

  navigateTo(option: string) {
    console.log('Navigating to:', option);
  }
}
