export default interface Contact {
  id: string;
  name: string;
  phone: string;
  nickname: string;

  cep: string;
  address: string;
  neighborhood: string;
  number: string | number;
  state: string;
  city: string;
}
