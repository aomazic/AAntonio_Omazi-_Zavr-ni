import{HttpErrorResponse}from'@angular/common/http';
import {Component, Input, OnInit}from '@angular/core';
import {FormControl, NgForm}from '@angular/forms';
import {mergeMap, Observable, timer}from 'rxjs';
import {ArduinoVarijableService}from 'src/app/arduino-varijable.service';
import {ArduinoVarijable}from 'src/app/ArduinoVarijable';
import {UpdateVar}from 'src/app/UpdateVar';
import {AuthService}from '../../shared/services/auth.service';
import {Options}from '@angular-slider/ngx-slider';
@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
constructor(public authService: AuthService, private ArduinoService: ArduinoVarijableService) {}
  public varijable!: ArduinoVarijable;
  public updatevar!: UpdateVar;
  public modaltarget!: string;
  public updatetarget!: string;
  public varNameTarget!: string;
  public varUnitTarget!: string;
  public Var2Unit: string = "";
  public Var3Unit: string = "";
  public Var4Unit: string = "";
  public Var5Unit: string = "";
  public Var6Unit: string = "";
  public Var7Unit: string = "";
  public Var8Unit: string = "";
  public Var9Unit: string = "";
  public Var10Unit: string = "";
  public state: boolean = false;
  ngOnInit(): void {
  }
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 250,
    showSelectionBar: true
  };
  public getArduinoVarijable(userId: string): void {
    if(this.state){
    this.state = false;
    window.location.reload();
  }
  this.state = true;
    const reloadInterval = 1000;
    timer(0, reloadInterval).pipe(
      mergeMap(_ =>  this.ArduinoService.getArduinoVarijable(userId!))
    ).subscribe(
      (response: ArduinoVarijable) => {
        this.varijable = response;
        console.log(this.varijable);

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public openModal(position: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#insertTextModal');
    this.modaltarget = position
    container?.appendChild(button);
    button.click();

  }
  public switcValue(position: string, value: string, UpdateForm: NgForm, docName: String){
if(value == "0"){
UpdateForm.value.updateValue = 1;
}
else UpdateForm.value.updateValue = 0;
UpdateForm.value.docName=docName;
UpdateForm.value.updatetarget=position;
this.ArduinoService.updateArduinoVarijable(UpdateForm.value).subscribe(
  (response: any) => {
    this.updatevar = response;
    console.log(response);
    UpdateForm.reset();
  },
  (error: HttpErrorResponse) => {
    alert(error.message);
    UpdateForm.reset();
  }
);
  }

  public openUpdateModal(position: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#uptade');
    this.updatetarget = position
    container?.appendChild(button);
    button.click();
  }
  public openChangeVarNameModal(ChangeVarName: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#ChangeVarName');
    this.varNameTarget = ChangeVarName;
    container?.appendChild(button);
    button.click();
  }
  public openChoseUnitModal(ChoseUnitTarget: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#ChoseUnit');
    this.varUnitTarget = ChoseUnitTarget;
    container?.appendChild(button);
    button.click();

  }

    public changeText(addForm: NgForm){
      document.getElementById('add-dokument-form')?.click();
     document.getElementById(this.modaltarget)!.innerHTML = addForm.value.naziv

    }
    public ChangeVarName(addForm: NgForm){
      document.getElementById('ChangeVarName-dokument-form')?.click();
     document.getElementById(this.varNameTarget)!.innerHTML = addForm.value.naziv

    }

  public updateVarijable(UpdateForm: NgForm, docName: String){
    document.getElementById('add-dokument-form')?.click();
    UpdateForm.value.updatetarget=this.updatetarget;
    UpdateForm.value.docName=docName;
    this.ArduinoService.updateArduinoVarijable(UpdateForm.value).subscribe(
      (response: any) => {
        console.log(response);
        UpdateForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        UpdateForm.reset();
      }
    );

  }

  public ChoseUnit(ChangeVarUnit: NgForm){
    document.getElementById('ChoseUnit-dokument-form')?.click();

   switch(this.varUnitTarget){
    case "var2":
      this.Var2Unit = ChangeVarUnit.value.unit;
      break;
      case "var3":
        this.Var3Unit = ChangeVarUnit.value.unit;
        break;
        case "var4":
          this.Var4Unit = ChangeVarUnit.value.unit;
      break;
      case "var5":
        this.Var5Unit = ChangeVarUnit.value.unit;
      break;
      case "var6":
        this.Var6Unit = ChangeVarUnit.value.unit;
      break;
      case "var7":
        this.Var7Unit = ChangeVarUnit.value.unit;
      break;
      case "var8":
        this.Var8Unit = ChangeVarUnit.value.unit;
      break;
      case "var9":
        this.Var9Unit = ChangeVarUnit.value.unit;
      break;
      case "var10":
        this.Var10Unit = ChangeVarUnit.value.unit;
        break;
    default:
   }
  }

  ConvertToInt(num: string){
    return parseInt(num);


  }

  public updateslidervalue(UpdateForm: NgForm,Updatetarget: string, docName: String){
    UpdateForm.value.updatetarget=Updatetarget;
    UpdateForm.value.docName=docName;
    UpdateForm.value.updateValue = this.value.toString();
    this.ArduinoService.updateArduinoVarijable(UpdateForm.value).subscribe(
      (response: any) => {
        console.log(response);
        UpdateForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        UpdateForm.reset();
      }
    );

  }


}
