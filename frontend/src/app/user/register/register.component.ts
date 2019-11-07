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
  public password: string = '';

  public message: string = '';
  constructor(private userService: UserService,
              private router: Router) { }

  register() {
    this.userService.register(this.username, this.password)
      .subscribe((resp) => {
        this.message = resp;
        console.log(this.message);
        if (this.message == "you are registired successfully"){
          this.router.navigateByUrl('login')
        }
      }, (err) => {
        console.error('Error registering', err);
        this.message = err.error.msg;
      });
  }
}