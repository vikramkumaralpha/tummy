import { ValidatorFn, FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

export const PasswordMatchValidators: ValidatorFn = (control: FormGroup): ValidationErrors => {

    const password = control.get('password').value;
    const reenteredPassword = control.get('confirmPassword').value;

    if (password != reenteredPassword) {
        return { 'passwordMismatch': true };
    }

    return null;
}
