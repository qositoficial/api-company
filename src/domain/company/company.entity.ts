export type CompanyProps = {
    id?: string;
    cnpj: number;
    name: string;
    phone: number;
    email: string;
    status?: boolean;
};

export class Company {
    private constructor(private props: CompanyProps) {}

    public static create(
        cnpj: number,
        name: string,
        phone: number,
        email: string
    ) {
        return new Company({
            id: crypto.randomUUID().toString(),
            cnpj,
            name,
            phone,
            email,
            status: true,
        });
    }

    public get id() {
        return this.props.id;
    }

    public get cnpj() {
        return this.props.cnpj;
    }

    public get name() {
        return this.props.name;
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

    public changeStatus(status: boolean) {
        this.props.status = status;
    }
}
