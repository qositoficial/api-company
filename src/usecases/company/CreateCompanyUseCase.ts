import { Company } from './../../domain/company/CompanyEntity';
import type { CompanyGateway } from "../../domain/company/CompanyGateway"
import type { UseCase } from "../UseCase"

export type CreateCompanyInputDTO = {
    name: string,
    cnpj: number,
    phone: number,
    email: string,
}

export type CreateCompanyOutputDTO = {
    id: string,
    status: boolean
}

export class CreateCompanyUseCase implements UseCase<CreateCompanyInputDTO, CreateCompanyOutputDTO> {
    private constructor(private readonly companyGateway: CompanyGateway) {}

    public static create(companyGateway: CompanyGateway) {
        return new CreateCompanyUseCase(companyGateway)
    }

    public async execute(props: CreateCompanyInputDTO): Promise<CreateCompanyOutputDTO> {
        const aCompany = Company.create(props)

        await this.companyGateway.save(aCompany)

        const output = this.presentOutput(aCompany)

        return output       
    }

    private presentOutput(company: Company): CreateCompanyOutputDTO {
        const output: CreateCompanyOutputDTO = {
            id: company.id,
            status: company.status
        }

        return output
    }
}