import { PrismaClient } from "@prisma/client";
import { Company } from "../../../domain/company/CompanyEntity";
import type { CompanyGateway } from "../../../domain/company/CompanyGateway";

export class CompanyRepositoryPrisma implements CompanyGateway {
    private constructor(private readonly prismaClient: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new CompanyRepositoryPrisma(prismaClient)
    }
    public async save(company: Company): Promise<void> {
        const data = {
            id: company.id,
            name: company.name,
            cnpj: company.cnpj,
            phone: company.phone,
            email: company.email,
            status: company.status
        }

        await this.prismaClient.company.create({data})
    }

    public async list(): Promise<Company[]> {
        const companies = await this.prismaClient.company.findMany()

        const companyList = companies.map((c) => {
            const company = Company.with({
                id: c.id,
                name: c.name,
                cnpj: c.cnpj,
                phone: c.phone,
                email: c.email,
                status: c.status
            })

            return company
        })

        return companyList        
    }
}