import type { Request, Response } from "express"
import type { CreateCompanyInputDTO, CreateCompanyUseCase } from "../../../../../usecases/company/CreateCompanyUseCase"
import { HttpMethod, Route } from "../Route"

export type CreateCompanyResponseDTO = {
    id: string,
    status: boolean
}

export class CreateCompanyRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createCompanyService: CreateCompanyUseCase) {}

    public static create(createCompanyService: CreateCompanyUseCase) {
        return new CreateCompanyRoute(
            "/company",
            HttpMethod.POST,
            createCompanyService
        )
    }

    public getHandler(){
        return async (request: Request, response: Response) => {
            const { name, cnpj, phone, email } = request.body
            const input: CreateCompanyInputDTO = {
                name, cnpj, phone, email
            }

            const output: CreateCompanyResponseDTO = await this.createCompanyService.execute(input)

            const responseBody = this.present(output)

            response.status(201).json(responseBody).send()
        }
    }

    public getPath(): string {
        return this.path
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    private present(input: CreateCompanyResponseDTO): CreateCompanyResponseDTO {
       const response = { id: input.id, status: input.status }

       return response
    }
        
}