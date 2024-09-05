export type CompanyProps = {
    id: string,
    name: string,
    cnpj: number,
    phone: number,
    email: string,
    status: boolean
}

type CreateCompanyProps = {
    name: string,
    cnpj: number,
    phone: number,
    email: string,
}

export class Company {
    private constructor(private props: CompanyProps) {}

    public static create(props: CreateCompanyProps) {
        return new Company({
            id: crypto.randomUUID().toString(),
            name: props.name,
            cnpj: props.cnpj,
            phone: props.phone,
            email: props.email,
            status: true
        })
    }

    public get id() {
        return this.props.id;
    }

    public get name() {
        return this.props.name;
    }

    public get cnpj() {
        return this.props.cnpj;
    }

    public get phone() {
        return this.props.phone;
    }

    public get email() {
        return this.props.email;
    }

    public get status() {
        return this.props.status;
    }

    public static with(props: CompanyProps) {
        return new Company(props)
    }

    public changeStatus(status: boolean) {
        this.props.status = status;
    }
}