import axios from "axios";
import { useState } from "react";
import { Table } from "react-bootstrap"
import { BASE_URL } from "../constant";

interface Student {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    email: string;
}

const StudentTable = () => {

    const [data, setData] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    //function to help us fetch our data with axios, handle our error
    const fetchData = () =>{
        setIsLoading(true)
        axios
        .get(BASE_URL)
        .then(response => {
            setData(response.data)
        }).catch(error => {
            console.log(error);



        }).finally(() => {
            setIsLoading(false)
        })
    }

  return (
    <>

    <h1 className="d-flex justify-content-center">Student Directory</h1>
           <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      {
            data.map((student:Student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.address}</td>
                    <td>{student.phoneNumber}</td>
                    <td>{student.email}</td>
                </tr>
            ))}
      </tbody>
    </Table>
    </>
  )
}

export default StudentTable