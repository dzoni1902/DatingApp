import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { compileNgModule } from '@angular/compiler';
import { AlertifyService } from '../_services/alertify.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();           //output props emit EVENT
  model: any = {};
  registerForm?: FormGroup;
  //bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
    ) { }

    ngOnInit() {
      // this.bsConfig = {
      //   containerClass: 'theme-red'
      // };
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
    // this.authService.register(this.model).subscribe( () => {
    //   this.alertify.success('Registration successfull!')
    // }, 
    // error => {
    //   this.alertify.error(error);
    // });

    console.log(this.registerForm?.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
