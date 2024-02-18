import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions, GridReadyEvent, SideBarDef, ToolPanelDef } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-allitems-table-view',
  templateUrl: './allitems-table-view.component.html',
  styleUrls: ['./allitems-table-view.component.scss']
})
export class AllItemsTableViewComponent {

  @ViewChild('myGrid_1') myGrid_1: AgGridAngular;
  @ViewChild('viewitem', { static: false }) viewitem?: ModalDirective;
  @ViewChild('setalert', { static: false }) setalert?: ModalDirective;
  @ViewChild('bulkupdate', { static: false }) bulkupdate?: ModalDirective;
  @ViewChild('move', { static: false }) move?: ModalDirective;
  @ViewChild('clone', { static: false }) clone?: ModalDirective;

  all_Items_gridData:any = [];
  selected_row_data:any[];
  folder_structure_value:any = [];
  selected_row_data_length:any;
  showEditablefields:boolean = true;


  constructor(private http : HttpClient){
    setTimeout(() => {
      // this.clone?.show();
    }, 1000);
  }

  ngOnInit(): void {
    this.http.get('assets/json/folder_name.json').subscribe((res:any)=>{
      this.folder_structure_value = res;
      console.log('response',this.folder_structure_value);
    });
  }
  public gridApi_1!: GridApi;
  public defaultColDef: ColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    // floatingFilter: true,
  };
  gridOptions1: GridOptions = {
    defaultColDef: {
      filter: false,
    },
    overlayNoRowsTemplate: '<span class="ag-overlay-no-rows-center">Please Go back to Material Dashboard Page</span>',
    suppressMenuHide: false,
    rowSelection: 'multiple',
    rowHeight: 35,
    pagination: true,
    suppressHorizontalScroll: false,
    suppressMovableColumns: true,
    suppressDragLeaveHidesColumns: true,
    suppressContextMenu: false,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns Visibility',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: false,
          suppressColumnSelectAll: false,
        },
      } as ToolPanelDef,
    ],
    defaultToolPanel: null,
  };



  columnDefs1: ColDef[] = [
    {
      field: '',
      checkboxSelection: true,
      resizable:false,
      headerCheckboxSelection: true,
      width:10
    },
    {
      field: 'item_no',
      headerName: 'Item No',
      cellRenderer: this.cellrendered.bind(this, 'item_no'),
    },
    {
      field: 'item_name',
      headerName: 'Item Name',
      cellRenderer: this.cellrendered.bind(this, 'item_name'),
      onCellClicked: this.CellClicked.bind(this, 'item_name')
    },
    {
      field: 'item_category',
      headerName: 'Items Category',
      cellRenderer: this.cellrendered.bind(this, 'item_category')
    },
    {
      field: 'item_description',
      headerName: 'Item Description',
      cellRenderer: this.cellrendered.bind(this, 'item_description')
    },
    {
      field: 'procedure',
      headerName: 'Procedure',
      cellRenderer: this.cellrendered.bind(this, 'procedure')
    },
    {
      field: 'cat_no',
      headerName: 'Cat No',
      cellRenderer: this.cellrendered.bind(this, 'cat_no')
    },
    {
      field: 'lot_no',
      headerName: 'Lot No',
      cellRenderer: this.cellrendered.bind(this, 'lot_no')
    },
    {
      field: 'size',
      headerName: 'Size',
      cellRenderer: this.cellrendered.bind(this, 'size')
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      cellRenderer: this.cellrendered.bind(this, 'vendor')
    },
    {
      field: 'price',
      headerName: 'Price',
      cellRenderer: this.cellrendered.bind(this, 'price')
    },
    {
      field: 'unit',
      headerName: 'Unit',
      cellRenderer: this.cellrendered.bind(this, 'unit')
    },
    {
      field: 'expiry_date',
      headerName: 'Expiry Date',
      cellRenderer: this.cellrendered.bind(this, 'expiry_date')
    },
    {
      field: 'store',
      headerName: 'Store',
      cellRenderer: this.cellrendered.bind(this, 'store')
    },
    {
      field: 'cabinet',
      headerName: 'Cabinet',
      cellRenderer: this.cellrendered.bind(this, 'cabinet')
    },
    {
      field: 'min_level',
      headerName: 'Min Level',
      cellRenderer: this.cellrendered.bind(this, 'min_level')
    },
    {
      field: 'tags',
      headerName: 'Tags',
      cellRenderer: this.cellrendered.bind(this, 'tags')
    },
    {
      field: 'notes',
      headerName: 'Notes',
      cellRenderer: this.cellrendered.bind(this, 'notes')
    },
    {
      field: 'images',
      headerName: 'Images',
      cellRenderer: this.cellrendered.bind(this, 'images')
    },
    {
      field: 'barcodes',
      headerName: 'Barcodes',
      cellRenderer: this.cellrendered.bind(this, 'barcodes')
    },
    {
      field: 'action',
      headerName: 'Action',
      resizable:false,
      pinned:"right",
      cellRenderer: this.cellrendered.bind(this, 'action')

    },
  ];

  cellrendered(headerName: any, params: any) {
    switch (headerName) {
      case 'item_no': {
        return params.value;
      }
      case 'item_name': {
        return params.value;
      }
      case 'item_category': {
        return params.value;
      }
      case 'item_description': {
        return params.value;
      }
      case 'procedure': {
        return params.value;
      }
      case 'cat_no': {
        return params.value;
      }
      case 'lot_no': {
        return params.value;
      }
      case 'size': {
        return params.value;
      }
      case 'vendor': {
        return params.value;
      }
      case 'price': {
        return params.value;
      }
      case 'unit': {
        return params.value;
      }
      case 'expiry_date': {
        return params.value;
      }
      case 'store': {
        return params.value;
      }
      case 'cabinet': {
        return params.value;
      }
      case 'min_level': {
        return params.value;
      }
      case 'tags': {
        return params.value;
      }
      case 'notes': {
        return params.value;
      }
      case 'images': {
        return `<img src="${params.value}" width="52px" height="16px">`
      }
      case 'barcodes': {
        return params.value;
      }
      case 'action': {
        if(params.value)
        {
          return `<div class="d-flex flex-row">
          <i class="mdi mdi-eye-outline me-3" style="color:#855EDB;font-size:18px"></i>
          <i class="mdi mdi-pencil-outline me-3" style="color:#000;font-size:18px"></i>
          <i class="mdi mdi-trash-can-outline me-3" style="color:red;font-size:18px"></i>
          </div>`
        }
      }
    }
  }

  CellClicked(headerName: any, params: any) {
    switch(headerName){
      case 'item_name':{
        this.viewitem?.show();
      }
    }
  }

  onSelectionChanged(params:any){
    this.selected_row_data = [];
   this.gridApi_1.getSelectedNodes().forEach(element => {
     this.selected_row_data.push(element.data);
   });
   if(this.selected_row_data.length == 0){
     this.showEditablefields = false;
   }
   else{
     this.selected_row_data_length = this.selected_row_data.length;
     this.showEditablefields = true;
   }
 }

  onGridReady_1(params: GridReadyEvent) {
    this.gridApi_1 = params.api;
  }

  ngAfterViewInit(): void {
    this.http.get('assets/json/all-items.json').subscribe((res:any)=>{
      this.all_Items_gridData = res;
      this.myGrid_1.api?.setRowData(this.all_Items_gridData);
    });
  }
}
