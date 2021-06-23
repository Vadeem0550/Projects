import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  visible: boolean = false;
  form: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({});
  }

  toggle(): void {
    this.visible = !this.visible;

  }

}
