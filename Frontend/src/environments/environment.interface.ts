import { S } from "@fullcalendar/core/internal-common";

export interface IEnvironment {
  production: boolean;
  name?: string;
  apiUrl?: string;
  imageUrl?: string;
  clinicalDiagnosis?: string; //Started end points for use anywhere in the App
  patientLabDelete?: string;
  saveDataLab?: string;
  getLabDetails?: string;
  deletePostDiagnol?: string;
  saveDatapostDiagnosis?: string;
  clinicalPostDiagnosis?: string;
  deleteIndicationData?: string;
  saveDataIndication?: string;
  clinicalHistoryIndication?: string;
  deletePreDiagnosis?: string;
  saveData?: string;
  getMediationDetails?: string;
  saveMediationData?: string;
  deleteMediationData?: string;
  AllProcedureStatusData?: string;
  getCheckListData?: string;
  kiziCheckBoxesData?: string;
  kiziCheckBoxesTimeLine?: string;
  materialdashboard?:string;
  saveVitalDetails?:string;
  editVitals?:string;
  savePrecautions?:string;
  editPrecautions?:string;

}
