import { Component, computed,effect, Signal } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  registerForm!:FormGroup
    formValueSignal!: Signal<any>;
  formStatusSignal!: Signal<string>;
  roleSignal!: Signal<string>;

  isFormValid!: Signal<boolean>;
constructor(private fb:FormBuilder){
  this.registerForm=this.fb.group({
    firstName:['',[ Validators.required]],
    lastName:['',[ Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[\W_])(?=.*[0-9]).+$/)]],
    confirmPassword:['',[Validators.required]],
    phone:['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    role:['',[ Validators.required]],
    acceptTerms:[false,[Validators.requiredTrue]],
    adminCode:['']  
  },{validators:this.passwordMismatchValidator});
  

  this.formValueSignal=toSignal(this.registerForm.valueChanges,{initialValue:this.registerForm.value})
  this.formStatusSignal=toSignal(this.registerForm.statusChanges,{initialValue:this.registerForm.value});
  this.isFormValid=computed(()=>this.formStatusSignal()==='VALID')
  this.roleSignal=toSignal(this.registerForm.get('role')!.valueChanges,{initialValue:this.registerForm.get('role')!.value});
  
  effect(()=>{
    const role=this.roleSignal();
    if(role==='Admin'){
      this.registerForm.get('adminCode')?.addValidators(Validators.required);
    }else{
      this.registerForm.get('adminCode')?.clearValidators();
      this.registerForm.get('adminCode')?.setValue('');
    }
    this.registerForm.get('adminCode')?.updateValueAndValidity();
  });
  }

passwordMismatchValidator(group:FormGroup):ValidationErrors | null {
  const passwordValue=group.get('password')?.value;
  const confirmPasswordValue=group.get('confirmPassword')?.value;
  return (passwordValue===confirmPasswordValue) ? null : {passwordMismatch:true}
}

  
  onSubmit(){
    if(this.isFormValid()){
      console.log(this.formValueSignal())
    } else{
      this.registerForm.markAllAsTouched();
      console.log('form has invalid data in fields');
    }
  }
}