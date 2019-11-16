import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public username: string = '';
  public email: string = '';
  public password: string = '';


  public message: string = '';
  constructor(private userService: UserService,
    private router: Router) { }

  register() {
    if (this.username.length == 0 || this.password.length == 0 || this.email.length == 0) {
      alert("INPUT IS EMPTY");
    } else {
      this.userService.register(this.username, this.email, this.password)
        .subscribe((resp) => {
          this.message = resp;
          console.log(this.message);
          if (this.message == "you are registired successfully") {
            this.router.navigateByUrl('login')
          }
        }, (err) => {
          console.error('Error registering', err);
          this.message = err.error.msg;
        });
    }
  }
}