import React, { Component } from 'react';

import axios from 'axios';
import {
    MDBCollapse, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBFormInline, MDBIcon,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarToggler, MDBNavItem,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdbreact";
import { MDBBtn } from "mdbreact";
import {Link} from "react-router-dom";

import Cookies from 'js-cookie'

class Book extends Component {

    handleback()
    {
        window.location.href = "http://localhost:3000/Homepage#/Homepage";
    }

    constructor(props) {
        super(props);
        this.state = {


            books:[],
            username:Cookies.get("username"),



        }

    }
    componentDidMount() {

        axios.get(`http://localhost:8080/Javaweb_war_exploded/Booklist`,{
            params: {
                flag: "FALSE",
                isbn: this.props.match.params.id,
            }
        }).then(res => {
                this.setState({ books: res.data });
            });



    }
    render()
    {
        return(
            <a>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="white-text">Homepage</strong>
                    </MDBNavbarBrand>

                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <span className="mr-2">Dropdown</span>
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem ><Link to="/Order" >Order</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Cart" >Cart</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Homepage" >Homepage</Link></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>

                        </MDBNavbarNav>
                        <MDBNavbarNav right>

                            <MDBNavItem>
                                <MDBFormInline waves>
                                    <div className="md-form my-0">
                                        <input id={'filter'} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={() => this.handleChange()} />
                                    </div>
                                </MDBFormInline>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem ><Link to="/" >Logout</Link></MDBDropdownItem>
                                        <MDBDropdownItem ><Link to="/Register" >Register</Link></MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>

                <MDBTable>
                    <MDBTableHead>
                        <tr>
                            <th><a >书名</a></th>
                            <th><a >作者</a></th>
                            <th><a >价格</a></th>
                            <th><a >isbn</a></th>
                            <th><a >库存</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.author}
                                    </td>
                                    <td>
                                        {item.price / 100}
                                    </td>
                                    <td>
                                        {item.isbn}
                                    </td>
                                    <td>
                                        {item.stock}
                                    </td>


                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>
                <img src={"http://localhost:8080/Javaweb_war_exploded/getImage?isbn="+ this.props.match.params.id} height={"289"} width={"200"}/>


                <MDBBtn className="d-block p-2 " color="primary">Add to Cart</MDBBtn>
                <MDBBtn className="d-block p-2 " color="info">Directly purchase</MDBBtn>
                <MDBBtn className="d-block p-2 " rounded color="secondary" onClick={this.handleback}>Back</MDBBtn>

            </a>

    )
    }
}

export default Book;
