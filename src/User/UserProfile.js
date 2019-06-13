import React, { Component } from "react";
import {
    MDBJumbotron,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdown,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarNav,
    MDBNavItem,
    MDBIcon,
    MDBNavbar, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput
} from "mdbreact";
import axios from "axios/index";
import Cookies from "js-cookie";
import "react-datepicker/dist/react-datepicker.css";




class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: Cookies.get('url'),
            username: Cookies.get("username"),
            user: [],
            modal: false,


        }





    }
    componentDidMount()
    {
        axios.get(this.state.url+"/userprofile/username/"+this.state.username).then(res => {
            this.setState({ user: res.data });
        });

    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLogout()
    {
        window.location.href = "http://localhost:3000/"
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    render()
    {
        return (
            <div>
                <MDBNavbar color="indigo" dark expand="md" className="nav-justified">
                    <MDBNavbarBrand>
                        <strong className="dark-text">User Profile</strong>
                    </MDBNavbarBrand>

                    <MDBNavbarBrand>
                        <strong className="dark-text">Weclome,  User {this.state.username}           </strong>
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
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Order")}>Order</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Cart")}>Cart</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Homepage")}>Homepage</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("Userstatistics")}>Statistics</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>

                        </MDBNavbarNav>

                        <MDBNavbarNav right>


                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default" right>
                                        <MDBDropdownItem onClick={()=>this.handleNavLink("UserProfile")}>UserProfile</MDBDropdownItem>
                                        <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                </MDBNavbar>

                <MDBContainer className="mt-5 text-center">
                    <MDBRow>
                        <MDBCol>
                            <MDBJumbotron>
                                <h2 className="h1 display-3">Hello, {this.state.username}!</h2>
                                <p className="lead">
                                    Email : {this.state.user.email}
                                </p>
                                <hr className="my-2" />
                                <p>
                                    You must provide your password to change your username, password or email.
                                </p>
                                <p className="lead">
                                    <MDBBtn color="primary" onClick={this.toggle}>Change</MDBBtn>
                                </p>
                            </MDBJumbotron>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalHeader toggle={this.toggle}>Please input your password</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label="Your password"

                                type="password"
                                validate
                                containerClass="mb-0"
                                id={"password"}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <p>
                                <MDBBtn color="info" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Change Email</MDBBtn>
                                <MDBBtn color="warning" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Change Username</MDBBtn>
                            </p>
                            <p>
                                <MDBBtn color="danger" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Change Password</MDBBtn>
                                <MDBBtn color="secondary" style={{ height: 50, width:200, marginTop: 10 }} onClick={this.toggle}>Close</MDBBtn>
                            </p>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </div>
        );
    }
}


export default UserProfile;