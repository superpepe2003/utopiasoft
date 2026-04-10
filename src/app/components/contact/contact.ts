import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  form: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitted = signal(false);

  onSubmit() {
    const { name, email, subject, message } = this.form;
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoUrl = `mailto:contacto@utopiasoft.net.ar?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoUrl;
    this.submitted.set(true);
  }
}
