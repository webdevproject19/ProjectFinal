import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public login = '';
  public password = '';
  public confirm = '';
  public email = '';
  public name = '';

  constructor(private provider: ProviderService, private router: Router) { }

  ngOnInit() {
  }

  clear() {
    this.login = '';
    this.password = '';
    this.confirm = '';
    this.email = '';
    this.name = '';
  }

  signUp() {
    if (!this.login || !this.password || !this.confirm) {
      alert('Please provide username and password');
      this.clear();
    } else if (this.password !== this.confirm) {
      alert('Passwords do not coincide');
      this.clear();
    } else {
      this.provider.register(this.login, this.password, this.name, this.email).then(res => {
        this.clear();
        this.router.navigate(['/login']);
        alert('You were successfully signed up. Now, please, log in');
      }).catch(res => {
        alert('Something went wrong. Please, try again');
        this.clear();
      });
    }
  }

}
