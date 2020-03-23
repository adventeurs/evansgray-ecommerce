import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  email;
  name;
  amount;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.paramMap.subscribe( params =>{
      this.email = params.get('email');
      this.amount = params.get('amount')
    })
    
    
  }

}
