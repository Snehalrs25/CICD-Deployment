import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      
      const requestBody = {
        "module_key": "EMI_SERVICE",
        "current_version": "13.3.0",
        "upcoming_version": "13.3.1",
        "rollout_percent": 20,
        "release_notes": "New CR",
        "commit_id": "abc123",
        "status": "draft",
        "generated_at": "2025-11-04T10:00:00Z"
      };

      this.http.post('http://localhost:3000/v1/releases', requestBody).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          alert('Release created successfully!');
          this.router.navigate(['/releases']);
        },
        error: (error) => {
          console.error('API Error:', error);
          alert('Error creating release: ' + (error.error?.message || error.message));
        }
      });
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  //   onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     console.log('Login form submitted:', this.loginForm.value);
      
  //     // Navigate to release-info component after successful login
  //     this.router.navigate(['/releases']);
  //   } else {
  //     this.markFormGroupTouched(this.loginForm);
  //   }
  // }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
