import { AbstractControl } from '@angular/forms';

// In this approach we can't pass the argument to the validator function
// See the other approach as below (not a runtime parameter)
export function forbiddenNameValidator(
  control: AbstractControl
): { [keys: string]: any } | null {
  const forbiddenName = /admin/.test(control.value);

  return forbiddenName ? { forbiddenName: { value: control.value } } : null;
}

// In this approach, we pass in the argument and customize the validation
export function forbiddenNameCustomValidator(regex: RegExp) {
  return (control: AbstractControl): { [keys: string]: any } | null => {
    const forbiddenName = regex.test(control.value);

    return forbiddenName ? { forbiddenName: { value: control.value } } : null;
  };
}
