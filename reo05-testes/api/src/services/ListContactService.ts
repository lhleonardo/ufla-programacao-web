import AppError from "../errors/AppError";
import Contact from "../models/Contact";
import IContactRepository from "../repositories/IContactRepository";

interface IDeleteContactRequest {
  operator: string;
  value: string;
}

export default class DeleteContactService {
  constructor(private repository: IContactRepository) {}

  public async execute({
    operator,
    value,
  }: IDeleteContactRequest): Promise<Contact[]> {
    if (
      operator !== "phone" &&
      operator !== "nickname" &&
      operator !== "name"
    ) {
      throw new AppError("Invalid operator for search");
    }

    if (!value) {
      throw new AppError("The value of search is required");
    }

    const response = await this.repository.list({ operator, value });

    return response;
  }
}
