import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBRow, MDBContainer, MDBCol, MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import axios from 'axios/index';
import Cookies from "js-cookie";
import "../css/Homepage.css";



let order = {
    name: true,
    author: true,
    price: true,
    isbn: true,
    stock: true,
    booklistID:true,
    sales:true,
};
let orderBy = 'name';
class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            books: [

            ],
            booksCp: [

            ],
            username:Cookies.get("username"),
            photoIndex: 0,
            images: [

            ],
            imagesCp:[

            ],
            searchOption:"Name",
            url:Cookies.get("url"),
            num: 0
        };
    }
    componentDidMount()
    {
        if(Cookies.get("username")==='')
        {
            window.location.href = "http://localhost:3000/";
        }
        let url=Cookies.get('url');
        axios.get(url+`/userbooklist`,
            )
            .then(res => {
                this.setState(
                    {
                    books: res.data,
                    booksCp: res.data
                    });
            });
        axios.get(url+`/userbookidlist`,
            )
            .then(res => {
                this.setState(
                    {
                        images: res.data,
                        imagesCp:res.data,
                    });
            });
        axios.get(url+`/counter`,
        )
            .then(res => {
                this.setState(
                    {
                        num: res.data,
                    });
            });

    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
    handleLink(id) {

            return "/homepage/detail/" + id;

    }
    handleSort(index) {
        orderBy = index
        order[index] = !order[index]
        let list = []
        for (let i = 0; i < this.state.books.length; i++) {
            list.push(this.state.books[i])
        }
        list.sort(this.sort)
        this.setState({
            books: list
        })
    }
    sort(a, b) {
        let res = 0;
        if (a[orderBy] < b[orderBy]) {
            res = -1
        } else if (a[orderBy] > b[orderBy]) {
            res = 1
        } else {
            res = 0
        }
        if (!order[orderBy]) {
            res = 0 - res
        }
        return res
    }
    handleChange() {
        if(this.state.searchOption==="Name") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.name.indexOf(pattern) !== -1
            })
            let imagelist=[];
            for(let i=0;i<list.length;i++)
            {
                for(let j=0;j<this.state.imagesCp.length;j++)
                {
                    if(list[i].booklistID.toString()===this.state.imagesCp[j])
                    {
                        imagelist.push(list[i].booklistID);
                        break;
                    }

                }
            }
            this.setState({
                books: list,
                images:imagelist
            })
            return;
        }
        if(this.state.searchOption==="Author") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.author.indexOf(pattern) !== -1
            })
            let imagelist=[];
            for(let i=0;i<list.length;i++)
            {
                for(let j=0;j<this.state.imagesCp.length;j++)
                {
                    if(list[i].booklistID.toString()===this.state.imagesCp[j])
                    {
                        imagelist.push(list[i].booklistID);
                        break;
                    }

                }
            }
            this.setState({
                books: list,
                images:imagelist
            })
            return;
        }
        if(this.state.searchOption==="isbn") {
            let pattern = document.getElementById('filter').value
            let list = this.state.booksCp.filter((item) => {
                return item.isbn.indexOf(pattern) !== -1
            })
            let imagelist=[];
            for(let i=0;i<list.length;i++)
            {
                for(let j=0;j<this.state.imagesCp.length;j++)
                {
                    if(list[i].booklistID.toString()===this.state.imagesCp[j])
                    {
                        imagelist.push(list[i].booklistID);
                        break;
                    }

                }
            }
            this.setState({
                books: list,
                images:imagelist
            })
            return;
        }

    }
    handleUnsubscribe()
    {
        let key = prompt("Are you sure you want to delete your account and all your infomation? Type your username", "Your Username");
        if(key===this.state.username)
        {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", this.state.url+"/userprofile/unsubscribe/username/"+this.state.username, false);
            xhr.send();
            if (xhr.responseText === "true")
            {
                alert("Your account has been unsubscribed!");
                Cookies.set('username','');
                window.location.href = "http://localhost:3000/";
                return;
            }
            else
            {
                alert("Failed to unsubscribe your account");
                return;
            }
        }
    }
    handleLogout()
    {
        Cookies.set('username','');
        window.location.href = "http://localhost:3000/"
    }
    handlepictureLink(imageSrc)
    {
        window.location.href = "/Homepage#/homepage/detail/" + imageSrc;
    }
    renderImages = () => {
        let photoIndex = 0;
        const { images } = this.state;
        let url=Cookies.get('url');
        return images.map(imageSrc => {
            photoIndex++;
            return (
                <MDBCol md="3" key={photoIndex}>
                    <figure >
                        <img
                            height="300px"
                            width="200px"

                            src={url+"/image/"+imageSrc}
                            alt="Gallery"
                            className="img-fluid z-depth-1"
                            onClick={() => {this.handlepictureLink(imageSrc)}}
                        />
                    </figure>
                </MDBCol>
            );
        })
    }
    handleNavLink(where){
        window.location.href = "http://localhost:3000/Homepage#/"+ where;
    }
    handleSearchOption(what){
        this.setState({
            searchOption:what
        })
    }

    render() {
        return (
           <div>
               <MDBNavbar color="indigo" dark expand="md" className="nav-justified" >
                   <MDBNavbarBrand>
                       <strong className="dark-text">Books</strong>
                   </MDBNavbarBrand>

                   <MDBNavbarBrand>
                       <strong className="dark-text">Weclome,  User {this.state.username}           </strong>
                   </MDBNavbarBrand>
                   <MDBNavbarBrand>
                       <strong className="dark-text">Views {this.state.num}           </strong>
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
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("ChatRoom")}>ChatRoom</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Search")}>Search</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Userstatistics")}>Statistics</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("Friend")}>Friend</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>

                       </MDBNavbarNav>

                       <MDBNavbarNav right>
                           <MDBNavItem>
                               <MDBDropdown >
                                   <MDBDropdownToggle nav caret>
                                       <span className="mr-2">Search by {this.state.searchOption}</span>
                                   </MDBDropdownToggle>
                                   <MDBDropdownMenu>
                                       <MDBDropdownItem onClick={()=>this.handleSearchOption("Name")}>Name</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleSearchOption("Author")}>Author</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>this.handleSearchOption("isbn")}>isbn</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>
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
                                       <MDBDropdownItem onClick={()=>this.handleNavLink("UserProfile")}>UserProfile</MDBDropdownItem>
                                       <MDBDropdownItem onClick={()=>{this.handleLogout()}}>Logout</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>
                           <MDBNavItem>
                               <MDBDropdown>
                                   <MDBDropdownToggle nav caret>
                                       <MDBIcon icon="heart-broken" />
                                   </MDBDropdownToggle>
                                   <MDBDropdownMenu className="dropdown-default" right>
                                       <MDBDropdownItem onClick={()=>this.handleUnsubscribe()}>Unsubscribe</MDBDropdownItem>
                                   </MDBDropdownMenu>
                               </MDBDropdown>
                           </MDBNavItem>
                       </MDBNavbarNav>
                   </MDBCollapse>

               </MDBNavbar>

                <MDBTable responsive small fixed bordered hover scrollY maxHeight="400px">
                    <MDBTableHead>
                        <tr>
                            <th><a onClick={() => { this.handleSort("booklistID") }}>BookID</a></th>
                            <th><a onClick={() => { this.handleSort("name") }}>Name</a></th>
                            <th><a onClick={() => { this.handleSort("author") }}>Author</a></th>
                            <th><a onClick={() => { this.handleSort("price") }}>Price</a></th>
                            <th><a onClick={() => { this.handleSort("isbn") }}>isbn</a></th>
                            <th><a onClick={() => { this.handleSort("stock") }}>Stock</a></th>
                            <th><a onClick={() => { this.handleSort("sales") }}>Sales</a></th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.state.books.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td >
                                        {item.booklistID}
                                    </td>
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
                                    <td>
                                        {item.sales}
                                    </td>
                                    <td >
                                        <Link to={this.handleLink(item.booklistID)}>Details</Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </MDBTableBody>
                </MDBTable>

               <MDBContainer className="mt-5 p-3" >
                   <div className="mdb-lightbox p-3">
                       <MDBRow>
                           {this.renderImages()}
                       </MDBRow>
                   </div>
               </MDBContainer>
            </div>







        );
    }
}

export default Homepage;
