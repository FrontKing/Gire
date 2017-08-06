import { IndexComponent } from './../index/index.component';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private dialogRef: MdDialogRef<IndexComponent>) { }

  ngOnInit() {
  }

}
