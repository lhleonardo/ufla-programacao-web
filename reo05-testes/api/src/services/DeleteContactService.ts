import IContactRepository from "../repositories/IContactRepository";

interface IDeleteContactRequest {
  contactId: string;
}

export default class DeleteContactService {
  constructor(private repository: IContactRepository) {}

  public async execute({ contactId }: IDeleteContactRequest): Promise<void> {
    await this.repository.delete(contactId);
  }
}
