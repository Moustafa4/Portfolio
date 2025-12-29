import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  form: FormGroup;
  isSent = false;
  errorMsg = '';
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(3), Validators.required]],
      message: ['', Validators.required],
    });
  }

  sendEmail(event: Event) {
    event.preventDefault();
    this.submitted = true;
    if (this.form.invalid) return;

    emailjs
      .sendForm('service_z1xj01g', 'template_j1tyf8a', event.target as HTMLFormElement, {
        publicKey: 'ajxbtn9H3g3_D4tfC',
      })
      .then(
        () => {
          this.isSent = true;
          this.form.reset();
          this.submitted = false;
          setTimeout(() => (this.isSent = false), 1000);
        },
        () => {
          this.errorMsg = 'Failed to send, please try again later.';
        }
      );
  }
}
