import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewletterService } from '../../services/newletter.service';

@Component({
  selector: 'app-news-form',
  standalone: true,
  imports: [BtnPrimaryComponent, ReactiveFormsModule],
  providers:[NewletterService],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.scss'
})
export class NewsFormComponent {
  newsletterForm!: FormGroup;
  loading = signal(false)

  constructor(private  service: NewletterService) {
    this.newsletterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  OnSubmit() {
    this.loading.set(true);
    if(this.newsletterForm.valid){
      this.service.sendData(this.newsletterForm.value.name, this.newsletterForm.value.email).subscribe({
        next: () => {
          this.newsletterForm.reset();
          this.loading.set(false);
        }
      })
    }
  }

}
