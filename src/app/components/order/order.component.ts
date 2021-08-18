import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderAddComponent } from '../order-add/order-add.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders = [
    {
      id: 1,
      buyer: "Buyer 1",
      salesOrderNo: 123,
      deliverDate: 1602288000,
      status: 'On Hold',
      items: [
        {
          style: 'top',
          color: 'white',
          qty: 100
        },
        {
          style: 'pant',
          color: 'Yellow Typo',
          qty: 50
        }
      ]
    },
    {
      id: 2,
      buyer: "Buyer 2",
      salesOrderNo: 456,
      deliverDate: 1602288000,
      status: 'In Manufacturing',
      items: [
        {
          style: 'top',
          color: 'Real Black',
          qty: 100
        }
      ]
    }
  ]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  onToggleActive(obj: any) {
    console.log(obj);
  }

  onAddOrder() {
    const dialogRef = this.dialog.open(OrderAddComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
