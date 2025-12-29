import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

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
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: [
        '',
        [Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/), Validators.required],
      ],
      name: ['', [Validators.minLength(3), Validators.required]],
      message: ['', Validators.required],
    });
  }
  get name() {
    return this.form.get('name');
  }
  get email() {
    return this.form.get('email');
  }
  get message() {
    return this.form.get('message');
  }

  sendEmail(event: Event) {
    this.submitted = true;
    if (this.form.invalid) return;
    emailjs
      .sendForm(
        'service_fpzcd7r',
        'template_ip6w5nf',
        event.target as HTMLFormElement, // أو سبّي event.target لو حابة
        { publicKey: 'ucjslz1BymbVcx29y' }
      )
      .then(
        (res: EmailJSResponseStatus) => {
          this.isSent = true;
          this.errorMsg = '';
          this.form.reset();
          this.submitted = false;
          setTimeout(() => (this.isSent = false), 1000);
        },
        (err) => {
          this.isSent = false;
          this.errorMsg = 'Failed to send, please try again later.';
          console.error(err);
        }
      );
  }
}
