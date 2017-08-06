import { CategoryComponent } from './../category/category.component';
import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TdLoadingService, TdMediaService } from '@covalent/core';
import { ItemsService, UsersService, ProductsService } from '../../services';
import { MdDialog, MdDialogRef } from "@angular/material";

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  viewProviders: [ItemsService, UsersService, ProductsService],
})
export class IndexComponent implements AfterViewChecked, OnInit {
  selectedOption: any;
  items: Object[];
  users: Object[];
  products: Object[];
  searchInputTerm: any;

  constructor(private _titleService: Title,
    private _itemsService: ItemsService,
    private dialog: MdDialog,
    private _loadingService: TdLoadingService,
    private router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    public media: TdMediaService) {

  }

  ngOnInit() {
    // this._titleService.setTitle('لیست کارهای روزمره');
  }

  logout() {
    this.router.navigate(['/login']);
  }
  ngAfterViewChecked(): void {
    // broadcast to all listener observables when loading the page
    this._changeDetectorRef.detectChanges();
    this.media.broadcast();
  }

  openDialog(): void {
    let dialogRef: any = this.dialog.open(CategoryComponent,{
                          width: '80%',
                        });

    dialogRef.afterClosed().subscribe( (res) => {
      this.selectedOption = res;
    })
  }

}
