import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class Contact {
  form: FormGroup;
  isSent = false;
  errorMsg = '';
  submitted = false;
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get message() {
    return this.form.get('message');
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(3), Validators.required]],
      message: ['', Validators.required],
    });
  }

  sendEmail() {
    this.submitted = true;
    if (this.form.invalid) return;

    emailjs
      .send(
        'service_z1xj01g',
        'template_j1tyf8a',
        {
          user_name: this.form.value.name,
          user_email: this.form.value.email,
          message: this.form.value.message,
        },
        'ajxbtn9H3g3_D4tfC'
      )
      .then(
        () => {
          this.isSent = true;
          this.form.reset();
          this.submitted = false;
          setTimeout(() => (this.isSent = false), 1500);
        },
        () => {
          this.errorMsg = 'Failed to send, please try again later.';
        }
      );
  }
}
