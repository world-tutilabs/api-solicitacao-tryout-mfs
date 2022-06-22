# Criar Solicitação de Tryout
Sucessds: ✅
fails:    ❌  
> ## Caso de sucesso
1. ❌ Recebe uma requisição do tipo **POST** na rota **/api/signup**
2. ❌ Valida se a requisição foi feita por um **Eng_analista**
3. ❌ Valida dados obrigatórios **Code_sap**,**product_description**,**client**,**date**,**reason**,**status** e **InjectionProcess**
4. ❌ **Cria** uma solicitação de tryout com os dados fornecidos
5. ❌ Retorna **204**, sem dados

> ## Exceções
1. ❌ Retorna erro **404** se a API não existir
2. ❌ Retorna erro **403** se o usuário não for admin
3. ❌ Retorna erro **400** se a solicitação de tryout não forem fornecidos pelo client
4. ❌ Retorna erro **500** se der erro ao tentar criar a Solicitação
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact Git