import { AbstractControl } from '@angular/forms';

// This is going to be a cross-field validation for password and confirm password
export function PasswordValidator(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password.value &&
    confirmPassword.value &&
    password.value !== confirmPassword.value
    ? { misMatch: { value: control.value } }
    : null;
}
