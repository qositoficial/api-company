import type { Request, Response } from "express"
import type { ListCompaniesOutputDTO, ListCompaniesUseCase } from "../../../../../usecases/company/ListCompanyUseCase"
import { HttpMethod, Route } from "../Route"

export type ListCompaniesResponseDTO = {
    companies: {
        id: string,
        name: string,
        cnpj: number,
        phone: number,
        email: string,
        status: boolean
    }[]
}

export class ListCompaniesRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly listCompaniesService: ListCompaniesUseCase
    ) {}

    public static create(listCompaniesService: ListCompaniesUseCase) {
        return new ListCompaniesRoute(
            "/companies",
            HttpMethod.GET,
            listCompaniesService
        )
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const output = await this.listCompaniesService.execute()

            const responseBody = this.present(output)

            response.status(200).json(responseBody).send()
        }   
    }

    public getPath(): string {
        return this.path        
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: ListCompaniesOutputDTO): ListCompaniesResponseDTO {
        const response: ListCompaniesResponseDTO = {
            companies: input.companies.map((company) => ({
                id: company.id,
                name: company.name,
                cnpj: company.cnpj,
                phone: company.phone,
                email: company.email,
                status: company.status                
            }))
        }
        
        return response
    }
}