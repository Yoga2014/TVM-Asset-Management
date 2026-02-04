export interface Employee {
  id: number;
   name: string,
  email: string,
  department:string,
  role: 'ADMIN' | 'EMPLOYEE',
  joiningDate:string,
  status:'ACTIVE' | 'RESIGNED'
}

