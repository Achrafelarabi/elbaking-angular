import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{
  accountFormGroup!: FormGroup;
  currentPage :number = 0;
  pageSige:number = 5;
  accountObservable!:Observable<AccountDetails>
  operationFromGroup!:FormGroup;
  errorMessage!: string;
constructor(private fb:FormBuilder,
            private accountsService:AccountsService,
            public authService: AuthService) {}
ngOnInit() {
    this.accountFormGroup = this.fb.group({
      accountId :this.fb.control('')
    });
    this.operationFromGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount: this.fb.control(0),
      description : this.fb.control(null),
      accountDestination : this.fb.control(null)
    })
}

  handleSearchAccount() {
  let accountId : string=this.accountFormGroup.value.accountId;
   this.accountObservable= this.accountsService.getAccount(accountId,this.currentPage,this.pageSige).pipe(
     catchError(err => {
       this.errorMessage=err.message;
       return throwError(err);
     })
   );
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId:string=this.accountFormGroup.value.accountId;
    let operationType=this.operationFromGroup.value.operationType;
    let amount : number =this.operationFromGroup.value.amount;
    let description :string =this.operationFromGroup.value.description;
    let accountDestination :string =this.operationFromGroup.value.accountDestination;
    if (operationType=='DEBIT'){
     this.accountsService.debit(accountId,amount,description).subscribe({
       next:(data)=>{
         alert("Success DEBIT");
         this.operationFromGroup.reset();
         this.handleSearchAccount();
       },
       error:(err)=>{
         console.log(err);
       }
     });
    }else if (operationType=='CREDIT'){
      this.accountsService.credit(accountId,amount,description).subscribe({
        next:(data)=>{
          alert("Success CREDIT");
          this.operationFromGroup.reset();
          this.handleSearchAccount();
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }else if (operationType=='TRANSFER'){
      this.accountsService.transfer(accountId,accountDestination,amount,description).subscribe({
        next:(data)=>{
          alert("Success Transfer");
          this.operationFromGroup.reset();
          this.handleSearchAccount();
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }

  }
}
