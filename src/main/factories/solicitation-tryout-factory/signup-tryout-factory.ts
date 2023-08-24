// import { MailtrapMailProvider } from "../../../data/protocols/providers/implementations/MailtrapMailProvider";
import { DbAddTryout } from "../../../data/useCases/SolicitationTryout/New-Mold/db-add-tryout";
import { TryoutMysqlRepository } from "../../../infra/Database/mysql/tryout-repository-prisma/tryout-mysql-repository";
import { SignUpTryoutController } from "../../../presentation/controllers/tryout-controllers/signUp-Tryout-Controller";
import { Controller } from "../../../presentation/protocols";
import { makeSignUpTryoutValidation } from "./validations/signup-tryout-validation-factory";

export const makeSignUpTryoutController = (): Controller => {
  // const mailtrapMailProvider = new MailtrapMailProvider();
  const AddSignUpMysqlRepository = new TryoutMysqlRepository();
  const dbAddTryout = new DbAddTryout(
    AddSignUpMysqlRepository
    // mailtrapMailProvider
  );
  const sinUpTryout = new SignUpTryoutController(
    dbAddTryout,
    makeSignUpTryoutValidation()
  );
  return sinUpTryout;
};
