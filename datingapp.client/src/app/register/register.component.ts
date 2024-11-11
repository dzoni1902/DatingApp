import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { compileNgModule } from '@angular/compiler';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();           //output props emit EVENT
  user?: User;
  registerForm?: FormGroup;
  bsConfig?: Partial<BsDatepickerConfig>;   //Partial - to make everything optional

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
    ) { }

    ngOnInit() {
      this.bsConfig = {
        containerClass: 'theme-green'
      };
      this.createRegisterForm();
    }
  
    createRegisterForm() {
      this.registerForm = this.fb.group(
        {
          gender: ['male'],
          username: ['', Validators.required],
          knownAs: ['', Validators.required],
          dateOfBirth: [null, Validators.required],
          city: ['', Validators.required],
          country: ['', Validators.required],
          password: ['',
            [
              Validators.required,
              Validators.minLength(4),
              Validators.maxLength(8)
            ]
          ],
          confirmPassword: ['', Validators.required]
        },
        { validator: this.passwordMatchValidator }
      );
    }
  
    passwordMatchValidator(g: FormGroup) {
      return g.get('password')?.value === g.get('confirmPassword')?.value
        ? null
        : { mismatch: true };
    }

  register() {
    if (this.registerForm?.valid) {
      this.user = Object.assign({}, this.registerForm.value);   //clones the values from form to empty object and assignes to user
      if (this.user) {
        this.authService.register(this.user).subscribe( () => {
          this.alertify.success('Registration successfull!')
        }, error => {
          const errorMessage = error.message || 'An error occurred'; 
          this.alertify.error(errorMessage);
        }, () => {                          //on complete, route to login page
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        });
      }
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
