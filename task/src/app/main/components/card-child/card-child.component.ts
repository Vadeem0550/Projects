import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDataChildren} from '../table/table.component';


@Component({
  selector: 'app-card-child',
  templateUrl: './card-child.component.html',
  styleUrls: ['./card-child.component.scss']
})
export class CardChildComponent implements OnInit {

  @Input() item: IDataChildren;

  @Input() activeId:number;

  @Output() activeIdOutput: EventEmitter<number> = new EventEmitter<number>();


  constructor() {
  }

  ngOnInit(): void {
  }

  onClick() {
  this.activeIdOutput.emit(this.item.id);
  }

}
