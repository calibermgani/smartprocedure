export interface IEnvironment {
  production: boolean;
  name?: string;
  apiUrl?: string;
  imageUrl?:string;
  clinicalDiagnosis?:string;
  patientLabDelete?:string;
  saveDataLab?:string;
  getLabDetails?:string;
  deletePostDiagnol?:string;
  saveDatapostDiagnosis?:string;
  clinicalPostDiagnosis?:string;
  deleteIndicationData?:string;
  saveDataIndication?:string;
  clinicalHistoryIndication?:string;
  deletePreDiagnosis?:string;
  saveData?:string;
}
