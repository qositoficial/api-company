import { ApiExpress } from "./infra/api/express/ApiExpress";
import { CreateCompanyRoute } from "./infra/api/express/routes/company/CreateCompanyExpressRoute";
import { ListCompaniesRoute } from "./infra/api/express/routes/company/ListCompaniesExpressRoute";
import { CompanyRepositoryPrisma } from "./infra/repositories/company/CompanyRepositoryPrisma";
import { prisma } from "./package/prisma/Prisma";
import { CreateCompanyUseCase } from "./usecases/company/CreateCompanyUseCase";
import { ListCompaniesUseCase } from "./usecases/company/ListCompanyUseCase";

function main() {
    const aRepository = CompanyRepositoryPrisma.create(prisma)

    const createCompanyUsecase = CreateCompanyUseCase.create(aRepository);
    const listCompanyUsecase = ListCompaniesUseCase.create(aRepository);

    const createRoute = CreateCompanyRoute.create(createCompanyUsecase);
    const listRoute = ListCompaniesRoute.create(listCompanyUsecase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = 8000;
    api.start(port);
}

main();