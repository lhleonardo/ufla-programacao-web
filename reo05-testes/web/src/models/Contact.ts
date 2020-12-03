export default interface Contact {
  id: string;
  name: string;
  nickname: string;
  phone: string;

  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  number: string | number;
}
