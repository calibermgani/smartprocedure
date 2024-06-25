import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AllServicesService } from 'src/app/core/services/all-services.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent {
  @ViewChild('addstaff', { static: false }) addstaff?: ModalDirective;
  tableMedication: FormGroup;
  medicationDetails: any[] = [];


  constructor(private formBuilder: FormBuilder, private allService: AllServicesService, private http: HttpClient,private toastr : ToastrService) {

  }

  ngOnInit(){
    this.tableMedication = this.formBuilder.group({
      medicationRows: this.formBuilder.array([this.createLabGroup()])
    });
    this.getMedicationDetails();
  }

  OpenModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
    this.tableMedication = this.formBuilder.group({
      medicationRows: this.formBuilder.array([])
    });
    this.medicationDetails.forEach(()=>this.addLabRow());
    this.medicationDetails.forEach((values,index)=>{
      this.medicationRows.controls[index].patchValue({
        test_name : values.test_name,
        result : values.result,
        date : values.date
      })
    })
  }

  AddModal(modalName: string){
    if(modalName === 'addstaff' && this.addstaff) this.addstaff?.show();
        this.tableMedication = this.formBuilder.group({
      medicationRows: this.formBuilder.array([this.createLabGroup()])
    });
  }
  CloseModal(modalName: string){
    if(modalName === 'addstaff') this.addstaff?.hide();
  }

  get medicationRows(): FormArray {
    return this.tableMedication.get('medicationRows') as FormArray;
  }

  createLabGroup(): FormGroup {
    return this.formBuilder.group({
      test_name: [''],
      result: [''],
      date: ['']
    });
  }

  addLabRow(): void {
    this.medicationRows.push(this.createLabGroup());    
  }

  deleteLabRow(index: number) {
    if(this.medicationRows.length > 1){
      (this.tableMedication.get('medicationRows') as FormArray).removeAt(index);
    }
  }

  resetFormAndAddEmptyRow() {
    this.tableMedication.reset();
    (this.tableMedication.get('medicationRows') as FormArray).clear();
    this.addEmptyRow();
  }

  addEmptyRow() {
    const rows = this.tableMedication.get('medicationRows') as FormArray;
    rows.push(this.formBuilder.group({
      test_name: [''],
      result: [''],
      date: ['']
    }));
  }

  getMedicationDetails(){
    this.allService.GetMedicationDetails().subscribe((medication : any)=>{
      if(medication.status === 'Success'){
        this.medicationDetails = medication.data;
        this.medicationDetails = this.medicationDetails.map((dateTime)=>{
          let date = new Date(dateTime.created_at);
          dateTime.created_at = this.allService.formattedDate(date);
          dateTime.created_Time = this.allService.formatTime(date);
          return dateTime;
        })
      }
    },
    error => {
      console.log(error);
    })
  }

  saveMedicationDetails(){
    const rowData = this.tableMedication.value.medicationRows;
    this.allService.saveDataMedication(rowData).subscribe((medication : any)=>{
      if(medication.status === 'Success'){
        this.toastr.success(`${medication.message}`,'Successfull', {
          positionClass: 'toast-top-center',
          timeOut: 1000
        });
        this.getMedicationDetails();
        this.resetFormAndAddEmptyRow();
      }
    },
    error => {
      console.log(error);
    })
  }



}
