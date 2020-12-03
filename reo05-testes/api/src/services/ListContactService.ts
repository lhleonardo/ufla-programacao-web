import AppError from "../errors/AppError";
import Contact from "../models/Contact";
import IContactRepository from "../repositories/IContactRepository";

interface IListContactRequest {
  params?: {
    operator: string;
    value: string;
  };
}

export default class ListContactService {
  constructor(private repository: IContactRepository) {}

  public async execute({ params }: IListContactRequest): Promise<Contact[]> {
    if (
      params &&
      params?.operator !== "phone" &&
      params?.operator !== "nickname" &&
      params?.operator !== "name"
    ) {
      throw new AppError("Invalid operator for search");
    }

    if (params && !params.value) {
      throw new AppError("The value of search is required");
    }

    console.log(this.repository);

    const response = await this.repository.list(
      params && {
        operator: params.operator,
        value: params.value,
      }
    );

    return response;
  }
}
