import axios from 'axios';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TablePagination from "@mui/material/TablePagination";
import { FaPlus,  FaUserTie } from "react-icons/fa";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";

//ADD CUSTOMER UUSING MODAL-BOX POP-UP...
import Modal from 'react-bootstrap/Modal';




const styles = {
    border: '1px solid #d3d3d3',
    borderRadius: '5px',
    color: 'grey',
    boxShadow: '-1px 1px 5px #d3d3d3',
    margin: '42px auto auto auto',
    background: '#ffff',
}

const rowHead = {
    fontWeight: 'bold',
    fontSize: '14px',
}








export default function Tablecomponent() {
    //TO CHECK SIDE EFFECTS OF COMPONENTS...
    useEffect(() => {
        fetchData();
    }, [])

    const [search, setSearch] = useState('');

    const [customerData, setCustomerdata] = useState([]);



    //FETCHING CUSTOMERS DATA FROM BACKEND-SIDE...
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/customers/list',{
                headers:{
                    method:'GET',
                    "Content-Type":"application/json",
                }
            }).then(
                res => setCustomerdata(res.data)
            )
        }
        catch (err) {
            console.log(err);
        }

    }


    //DELETING CUSTOMERS DATA...
    const deleteCustomer = async (id) => {

        try {
            if (window.confirm('Are you sure want to delete?')) {
                const response = await axios.delete('http://localhost:8081/customer/delete/' + `${id}`,{
                    headers:{
                        method:'DELETE',
                        "Content-Type":"application/json"
                    }
                }).then(
                    res => alert(res.data)
                )
                fetchData();
            }
            return false;
        }
        catch (err) {
            console.log(err);
        }
    
    }


    //PAGINATION...

    const [page, setPage] = React.useState(0);

    const [rpg, setrpg] = React.useState(5);

    const handleChange = (event, value) => {
        setPage(value);
    };

    //CHANGE ROWS PER PAGE...
    function handleChangeRowsPerPage(event) {
        setrpg(parseInt(event.target.value, 10));
        setPage(0);
    }


    //DECLARE THE MODAL STATES...
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //CREATE NEW CUSTOMER AND POSTING...
    const [newCustomer, setNewcustomer] = useState({
        cname: '',
        cmobile: '',
        cemail: ''
    })
    const { cname, cmobile, cemail } = newCustomer;

    const changeHandler = (e) => {
        setNewcustomer({ ...newCustomer, [e.target.name]: e.target.value });
    }




    const submitHandler = async (e) => {
        e.preventDefault();

        //POSTING NEW CUSTOMER DATA...
        try {
            if (cname !== "" && cmobile !== "" && cemail !== "") {
                if (cmobile.length == 10) {
                    //POST CALL AND INTEGRATION TO BACKEND...
                    let body = JSON.stringify({
                        customerSno: customerData.length + 1,
                        customerName: cname,
                        customerMobile: cmobile,
                        customerEmail: cemail
                    })

                    let res = await axios.post('http://localhost:8081/customers/add', body, {
                        headers: {
                            method: 'POST',
                            'Content-Type': 'application/json'
                        }
                    }).then(resp => alert(resp.data)).catch((error) => alert(error.response.data))
                } else { alert("Please Enter Valid 10 digit Mobile Number") }

            }
            else {
                alert('Customer Details should not Empty...')
            }
        }
        catch (err) {
            console.log(err);
        }



        // TO RESET THE FORM DATA...
        setNewcustomer({
            cname: '',
            cmobile: '',
            cemail: ''
        })
        fetchData();
    }

    return (
        <>
            <div style={styles}>
                <Form inline style={{ margin: '15px 500px 0px 500px' }}>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search with Name/Email"
                                className="mr-sm-2"
                                style={{ width: '220px' }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>


                {/*---- ADD CUSTOMER USING POPUP-BOX -----*/}
                <Button variant="primary" style={{ float: 'right', margin: '-40px 120px 0px 0px' }} title='Add' onClick={handleShow}> <FaPlus /> </Button>


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={rowHead} align="center"> S.No </TableCell>
                                <TableCell align="center" style={rowHead}> Name </TableCell>
                                <TableCell align="center" style={rowHead}> Mobile </TableCell>
                                <TableCell align="center" style={rowHead}> Email </TableCell>
                                <TableCell align="center" style={rowHead}> Actions </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerData.length !== 0 ? customerData.filter((li) => li.customerName.toLowerCase().includes(search) || li.customerEmail.toLowerCase().includes(search)).slice(page * rpg, page * rpg + rpg).map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.customerSno}
                                    </TableCell>
                                    <TableCell align="center">{row.customerName}</TableCell>
                                    <TableCell align="center">{row.customerMobile}</TableCell>
                                    <TableCell align="center">{row.customerEmail}</TableCell>
                                    <TableCell align="center">  <span style={{ margin: '5px', padding: '5px', fontSize: '15px', color: 'blue', boxShadow: '-1px 1px 5px #d3d3d3', borderRadius: '5px' }} title='Edit'> <BsPencilSquare /> </span> <span style={{ margin: '5px', padding: '5px', fontSize: '15px', color: 'red', boxShadow: '-1px 1px 5px #d3d3d3', borderRadius: '5px' }} title='Delete'> <BsTrash3 onClick={() => deleteCustomer(row._id)} /> </span> </TableCell>
                                </TableRow>
                            )) : <p> No Data Available </p>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {/* Pagination---section-- */}
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={customerData.length}
                rowsPerPage={rpg}
                page={page}
                onPageChange={handleChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/*------MODAL POP-UP BOX TO ADD CUSTOMER NEW DATA... --------*/}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> New Customer Data </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='off'>
                        <Form.Control type="text" placeholder="Enter Customer Name" maxLength={25} name='cname' value={cname} onChange={changeHandler} required />
                        <br />
                        <Form.Control type="number" placeholder="Enter Customer Mobile" name='cmobile' value={cmobile} onChange={changeHandler} required />
                        <br />
                        <Form.Control type="email" placeholder="Enter Customer Email" name='cemail' value={cemail} onChange={changeHandler} required />
                        <br />
                        <Button variant="primary" onClick={submitHandler} style={{ float: 'right' }}>  <FaUserTie style={{marginTop:"-5px"}}/> Add Customer </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}