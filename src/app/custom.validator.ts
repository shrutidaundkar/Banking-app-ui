import { FormGroup } from '@angular/forms';
    
export function CustomValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ customValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}