import { AbstractControl, ValidationErrors } from '@angular/forms'


export function passwordValidation( control: AbstractControl): ValidationErrors | null{
    if( control && (control.value !== null || control.value !== undefined) ){
        const confirm = control.value;

        const passRef = control.root.get('password')
        if( passRef ){
            const password = passRef.value;

            if( password !== confirm )
                return { Error: true };
            
        }
    }

    return null;
}