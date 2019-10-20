import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  columnDefs = [
    { headerName: 'Num', field: 'Num', sortable: true, filter: true },
    { headerName: 'Symbol', field: 'Symbol', sortable: true, filter: true },

    { headerName: 'Price', field: 'Price', sortable: true, filter: true },
    {headerName: 'Change', field: 'Change', sortable: true, filter: true }

  ];

  rowData = [
    { Num: '1', Symbol: 'ap', Price: 35000,Change: 5 },
    { Num: '2', Symbol: 'io', Price: 3500,Change: 1 },
    { Num: '3', Symbol: 'AA', Price: 350,Change: 2 }

  ];
}
