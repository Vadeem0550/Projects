import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IData} from '../table/table.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  active: boolean = false;
  @Input() dataOne: IData;

  @Input() activedId:number;

  @Output()
  public activeIdOutput: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.dataOne);
  }

  onClick(): void {
    this.active = !this.active;
  }
  activeId(event:number){
    this.activeIdOutput.emit(event);
  }
}


