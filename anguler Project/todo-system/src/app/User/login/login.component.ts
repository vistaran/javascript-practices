import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  email: string;
  password: string;
  public onSubmit(): void {
    console.log(this.email,this.password)
    this.router.navigateByUrl('signup');
  }

}
