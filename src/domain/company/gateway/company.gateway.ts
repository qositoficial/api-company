import { Company } from "../entity/company.entity";

export interface CompanyGateway {
    save(company: Company): Promise<void>;
    list(): Promise<Company[]>;
}
