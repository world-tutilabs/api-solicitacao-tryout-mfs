import { InvalidParamError } from "../../errors/invalid-param-error";
import { Validation } from "./validation";

export class InvalidFieldValidation implements Validation {
  constructor (private readonly field: string) {}
 validate(input: any): Error {
  if (!input[this.field]) {
    return new InvalidParamError(this.field)
  }
 }
}