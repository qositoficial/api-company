import { Company } from './../../domain/company/CompanyEntity';
import type { CompanyGateway } from "../../domain/company/CompanyGateway"
import type { UseCase } from "../UseCase"

export type ListCompaniesInputDTO = void

export type ListCompaniesOutputDTO = {
    companies: {
        id: string,
        name: string,
        cnpj: number,
        phone: number,
        email: string,
        status: boolean
    }[]
}

export class ListCompaniesUseCase implements UseCase<ListCompaniesInputDTO, ListCompaniesOutputDTO> {
    private constructor(private readonly companyGateway: CompanyGateway) {}

    public static create(companyGateway: CompanyGateway) {
        return new ListCompaniesUseCase(companyGateway)
    }

    public async execute(): Promise<ListCompaniesOutputDTO> {
        const aCompanies = await this.companyGateway.list()

        const output = this.presentOutput(aCompanies)

        return output
    }

    private presentOutput(companies: Company[]): ListCompaniesOutputDTO {
        return {
            companies: companies.map((company) => {
                return {
                    id: company.id,
                    name: company.name,
                    cnpj: company.cnpj,
                    phone: company.phone,
                    email: company.email,
                    status: company.status,
                }
            })
        }
    }
}
