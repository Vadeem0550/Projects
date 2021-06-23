import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../data.service';

export interface IData {
  id: number;
  name: string;
  defect: any;
  children: IDataChildren[];
}

export interface IDataChildren {
  id: number;
  name: string;
  unit: string;
  Fact: number;
  Model: number;
  warning: boolean;
  activeId: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  data: IData[] = [];
  active: boolean = false;
  activeId: number = null;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((backData) => {
      this.data = backData;
      console.log(this.data);
    });
  }

  activedId(event: number) {
    this.activeId = event;
    console.log(event)
  }
}
