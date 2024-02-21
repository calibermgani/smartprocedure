import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { AuthfakeauthenticationService } from './../../../core/services/authfake.service';
import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-slider-v2';

interface AllItems{
  id:number,
  item_no:string,
  item_name:string,
  item_category:string,
  item_description:string,
  procedure:string,
  cat_no:string,
  lot_no:string,
  size:string,
  vendor:string,
  price:string,
  unit:string,
  expiry_date:string,
  on_hand_qty:string,
  min_level:string,
  tags:string,
  notes:string,
  images:string,
  barcodes:string,
  action:string
}

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.component.html',
  styleUrls: ['./all-items.component.scss']
})
export class AllItemsComponent implements OnInit {

  category: string[];
  procedure: string[];
  format_value:string[];
  folder_structure_value:any[];
  hide_Overall_list:boolean = false;
  all_items_dropbtn:boolean = true;
  vendor_list_dropbtn:boolean = false;
  low_stock_dropbtn:boolean = false;
  overallview:boolean = true;
  selectedTab_To_View:string;
  files: File[] = [];
  imageURL: any;
  @ViewChild('additem', { static: false }) additem?: ModalDirective;
  @ViewChild('addcategory', { static: false }) addcategory?: ModalDirective;
  @ViewChild('addvendor', { static: false }) addvendor?: ModalDirective;
  @ViewChild('addtag', { static: false }) addtag?: ModalDirective;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;
  @ViewChild('notify', { static: false }) notify?: ModalDirective;
  @ViewChild('export', { static: false }) export?: ModalDirective;


  cartData: any[];
  subtotal: any = 0;
  discount: any;
  discountRate = 0.15;
  shipping: any;
  shippingRate: any = '65.00';
  tax: any;
  taxRate = 0.125;
  totalprice: any;

  options: Options = {
    floor: 0,
    ceil: 250
  };
  QuantityminValue: number = 10;
  QuantitymaxValue: number = 20;
  PriceminValue:number = 10;
  PricemaxValue:number = 40;
  StoreQtyminValue:number = 10;
  StoreQtymaxValue:number = 40;
  MinlevelMinimumValue:number = 40;
  MinlevelMaximumValue:number = 30;


  constructor(private authfakeauthenticationService: AuthfakeauthenticationService,private http : HttpClient) {
    this.category = []; this.procedure = [];this.format_value = ['KG'];

    this.authfakeauthenticationService.GridDetailedView_value.subscribe((res:any)=>{
      this.overallview = res;
    })
  }

  ngOnInit(): void {
    this.authfakeauthenticationService.changeSideMenu('material-management');
    this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
      this.folder_structure_value = res;
      console.log('response',this.folder_structure_value);
    });

    this.authfakeauthenticationService.selectedTabTypeValue.subscribe((res:any)=>{
      console.log('Selected Tab',res);
      this.selectedTab_To_View = res;
      this.enableTab = res;
      console.log('Selected Tab',res);
      console.log('Selected Tab',res);
    })
  }


  HideOverAllList(){
    this.hide_Overall_list =! this.hide_Overall_list;
  }

  SelectedTab(data:any)
  {
    switch(data){
      case 'All Items':{
        this.all_items_dropbtn = true;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Vendor list':{
        this.vendor_list_dropbtn = true;
        this.all_items_dropbtn=false;
        this.low_stock_dropbtn=false;
        break;
      }
      case 'Low Stock':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = true;
        break;
      }
      case 'Daily consumed':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Damaged':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Back to Cabinet':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = true;
        break;
      }
      case 'Wasted':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Near expired':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Refill to Cabinet':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
      case 'Recall':{
        this.all_items_dropbtn = false;
        this.vendor_list_dropbtn = false;
        this.low_stock_dropbtn = false;
        break;
      }
    }
  }




  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    let file: File = event.addedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      setTimeout(() => {
        // this.profile.push(this.imageURL)
      }, 100);
    }
    reader.readAsDataURL(file)
  }
  textcontent:any;
  select_folder(data:any){
    console.log('Selected Folder',data);
    this.textcontent = '';
    let elements = document.querySelector('.folder_img');
    console.log('elements',elements);
    this.textcontent = elements.nextSibling.textContent.trim();
    if(data == this.textcontent)
    {
      this.textcontent = data;
    }
    else
    {
      this.textcontent=''
    }
    console.log('clicked Folder',this.textcontent);
  }

  openModal()
  {
    console.log('1');
  }
  ngAfterViewInit(): void {

  }

  enableTab:any = '';
  changeTab(tabs:any){
    switch(tabs)
    {
      case 'Vendor list':{
        this.enableTab = 'Vendor list';
        break;
      }
      case 'Daily consumed':{
        this.enableTab = 'Daily consumed';
        break;
      }
      case 'Damaged':{
        this.enableTab = 'Damaged';
        break;
      }
      case 'Back to Cabinet':{
        this.enableTab = 'Back to Cabinet';
        console.log(this.enableTab);

        break;
      }
      case 'Wasted':{
        this.enableTab = 'Wasted';
        break;
      }
      case 'Near expired':{
        this.enableTab = 'Near expired';
        break;
      }
      case 'Low Stock':{
        this.enableTab = 'Low Stock';
        break;
      }
      case 'Refill to Cabinet':{
        this.enableTab = 'Refill to Cabinet';
        break;
      }
      case 'Recall':{
        this.enableTab = 'Recall';
        break;
      }
    }
  }

  resize:boolean = false;
  hideAdvancedFilters(){
    this.resize =! this.resize;
  }

  qty: number = 0;
  calculateQty(id: any, qty: any, i: any) {
    this.subtotal = 0;
    if (id == '0' && qty > 1) {
      qty--;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    if (id == '1') {
      qty++;
      this.cartData[i].qty = qty
      this.cartData[i].total = (this.cartData[i].qty * this.cartData[i].price).toFixed(2)
    }
    this.cartData.map((x: any) => {
      this.subtotal += parseFloat(x['total'])
    })
    this.subtotal = this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalprice = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
  }

  selectedView:any = 'table';
  ChangeView(view:any){
    switch(view){
      case 'grid':{
        this.selectedView = 'grid';
        break;
      }
      case 'list':{
        this.selectedView = 'list';
        break;
      }
      case 'table':{
        this.selectedView = 'table';
        break;
      }
    }
  }

  selectedExportType:string;
  selectExportType(data:any){
    switch(data){
      case 'excel':{
        this.selectedExportType='excel';
        break;
      }
      case 'pdf':{
        this.selectedExportType='pdf';
        break;
      }
    }
  }
}
