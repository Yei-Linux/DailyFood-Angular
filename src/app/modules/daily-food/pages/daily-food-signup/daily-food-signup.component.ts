import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-daily-food-signup",
  templateUrl: "./daily-food-signup.component.html",
  styleUrls: ["./daily-food-signup.component.scss"]
})
export class DailyFoodSignupComponent implements OnInit {
  public signUpForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.createSignUpForm();
  }

  public createSignUpForm(): FormGroup {
    return this.formBuilder.group({
      email: [
        ,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[^ @]*@[^ @]*")
        ]
      ],
      password: [, [Validators.required, Validators.minLength(3)]],
      user: [, Validators.required]
    });
  }

  public validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }

  public handleSignUp() {
    if(!this.signUpForm.valid){
      this.validateForm(this.signUpForm);
      return;
    }
    let user = new User();
    user.user = this.signUpForm.value["user"];
    user.password = this.signUpForm.value["password"];
    user.email = this.signUpForm.value["email"];
    this.userService.createUser(user).subscribe(response =>{
      this.router.navigateByUrl("/sign-in");
    })
  }

  public handleRedirectSignIn() {
    this.router.navigateByUrl("/sign-in");
  }
}
