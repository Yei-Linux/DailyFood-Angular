import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-daily-food-signin",
  templateUrl: "./daily-food-signin.component.html",
  styleUrls: ["./daily-food-signin.component.scss"]
})
export class DailyFoodSigninComponent implements OnInit {
  public signInForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInForm = this.handleGenerateSignInForm();
  }
  public handleGenerateSignInForm(): FormGroup {
    return this.formBuilder.group({
      email: [
        ,
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[^ @]*@[^ @]*")
        ]
      ],
      password: [, [Validators.required, Validators.minLength(3)]]
    });
  }
  public validateForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
  }
  public async hanleSignIn() {
    if (!this.signInForm.valid) {
      this.validateForm(this.signInForm);
      return;
    }
    let response = await this.userService.authenticationUser(
        this.signInForm.value["email"],
        this.signInForm.value["password"]
      ).toPromise();
    localStorage.setItem("data_user", JSON.stringify(response));
    this.router.navigateByUrl("/home");
  }

  public handleRedirectSignUp() {
    this.router.navigateByUrl("/sign-up");
  }
}
