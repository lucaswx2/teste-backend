export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  typeId: number;
  status: boolean;
}
