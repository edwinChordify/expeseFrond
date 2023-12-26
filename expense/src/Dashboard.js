import React from 'react';
import { useState } from 'react';
import instance from './baseURL';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import styles from './Dashboard.css'


function Dashboard() {
    const [amount, setamount] = useState("")
    const [category, setcategory] = useState("")
    const [despription, setdespription] = useState("")
    const [data, setdata] = useState("")
    const [editingExpense, setEditingExpense] = useState(null);

    const [info, setinfo] = useState([])



    const user = localStorage.getItem("userId")
    console.log(user);
    const navigate = useNavigate()




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`/expensedetails/${user}`);

                setinfo(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };

        fetchData();
    }, [user]);
    useEffect(() => {
        console.log(info);
    }, [info])

    const deleteExpense = async (expenseId) => {
        try {
            await instance.delete(`/deleteexpense/${expenseId}`);
            console.log(deleteExpense);
            // Update the info state by removing the deleted expense
            setinfo((prevInfo) => prevInfo.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const editExpense = async (expenseId) => {
        try {
            const editNew = await instance.get(`/eachExpense/${expenseId}`)
            console.log(editNew.data);
            setamount(editNew.data.amount);
            setcategory(editNew.data.category);
            setdespription(editNew.data.despription);
            setEditingExpense(editNew.data)

        } catch (error) {
            console.error("error", error)

        }

    }
    const submitNew = async (expenseId) => {

        const updatedInfo = { amount, category, despription };
        console.log(updatedInfo);
        try {
            await instance.put(`/editExpense/${expenseId}`, updatedInfo);
            alert("Expense updated");
            const updatedExpenses = info.map((exp) =>
                exp.id === editingExpense.id ? { ...exp, ...updatedInfo } : exp
            );
            setinfo(updatedExpenses);


        } catch (error) {
            alert("Issue updating expense");
            console.log(error);
        }
    };









    const submitThis = async (e) => {
        e.preventDefault()
        const info = { amount: amount, category: category, despription: despription }

        setdata(info)
        try {


            const registerresponse = await instance.post(`/addexpense/${user}`, info)
            alert("expense created")
            const newExpense = registerresponse.data;
            setamount("");
            setcategory("");
            setdespription("");
            setinfo((prevInfo) => [...prevInfo, newExpense]);




        } catch (error) {
            alert("issue")
            console.log(error);

        }



    }
    console.log(data);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate('/login');
    };



    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div class="container-fluid  justify-content-center">
                    <a class="navbar-brand" href="#"></a>
                    <div>
                    <h3 style={{color:"white"}}>Dashboard</h3>

                    </div>
                   
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                           
                          
                           
                            
                        </ul>
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button class="btn btn-light" type="submit" onClick={handleLogout}>Logout</button>
                        </form>
                    </div>
                </div>
            </nav><br />

            


<div style={{padding:"20px"}}>
<button
           
           type="button"
           className="btn btn-primary"
           data-bs-toggle="modal"
           data-bs-target="#staticBackdrop"
       >
           create expense      </button><br />

</div>
          




            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Enter your Expense Here...
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form action='' onSubmit={submitThis}>
                                <div class="mb-3">
                                    <label for="exampleInputAmount" class="form-label">Amount</label>
                                    <input type="text" class="form-control" id="exampleInputAmount" aria-describedby="emailHelp" onChange={(e) => setamount(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputTitle" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="exampleInputTitle" onChange={(e) => setcategory(e.target.value)} />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputDescription" class="form-label">Description</label>
                                    <input type="text" class="form-control" id="exampleInputDescription" onChange={(e) => setdespription(e.target.value)} />
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">submit
                                    </button>

                                </div>

                            </form>

                        </div>
                        <div className="modal-footer">


                        </div>
                    </div>
                </div>
            </div><br />


            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sl</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {info.map((expense, index) => (
                        <tr key={expense.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{expense.amount}</td>
                            <td>{expense.category}</td>
                            <td>{expense.despription}</td>
                            <td>{new Date(expense.createdAt).toLocaleString()}</td>
                            <td style={{gap:"20px"}}>
                                <button type="button" class="btn btn-danger" onClick={() => deleteExpense(expense.id)}>Delete</button>

                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editExpense(expense.id)}>
                                    edit
                                </button>


                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Expense</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form action=''>
                                                    <div class="mb-3">
                                                        <label for="exampleInputAmount" class="form-label">Amount</label>
                                                        <input type="text" class="form-control" id="exampleInputAmount" aria-describedby="emailHelp" value={amount} onChange={(e) => setamount(e.target.value)} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputTitle" class="form-label">Category</label>
                                                        <input type="text" class="form-control" id="exampleInputTitle" value={category} onChange={(e) => setcategory(e.target.value)} />
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleInputDescription" class="form-label">Description</label>
                                                        <input type="text" class="form-control" id="exampleInputDescription" value={despription} onChange={(e) => setdespription(e.target.value)} />
                                                    </div>
                                                    <div className='d-flex justify-content-center'>
                                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { submitNew(expense.id) }}>update
                                                        </button>

                                                    </div>


                                                </form>


                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </td>


                        </tr>
                    ))}

                </tbody>
            </table>


        </div>

    );
}

export default Dashboard;
