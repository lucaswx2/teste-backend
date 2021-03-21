export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  type_id: number;
  status: boolean;
}
