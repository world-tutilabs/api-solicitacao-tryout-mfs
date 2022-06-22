import { RequiredFieldValidation } from "../../../../presentation/helpers/validators/required-field-validation"
import { Validation } from "../../../../presentation/helpers/validators/validation"
import { ValidationComposite } from "../../../../presentation/helpers/validators/validation-composite"

export const makeSignUpTryoutValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['code_sap', 'product_description', 'client', 'reason', 'InjectionProcess', 'date']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}