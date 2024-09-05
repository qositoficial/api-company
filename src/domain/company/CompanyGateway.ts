import type { Company } from "./CompanyEntity";

export interface CompanyGateway {
    save(company: Company): Promise<void>
    list(): Promise<Company[]>
}