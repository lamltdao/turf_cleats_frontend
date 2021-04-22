import React, { Component } from "react";
import "../../stylesheets/SneakersDetail.css";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import { base_url } from "../../config";
import { withRouter } from "react-router-dom";
import moment from "moment";

class SneakersDetail extends Component {
  state = {
    //sneaker
    name: null,
    price: null,
    image: null,
    quantity: null,
    sneakersId: null,
    size: null,
    //modal+dropDown
    modalAddToCart: false,
    dropdownOpen: false,
    dropDownValue: "Choose Size",
    //comment
    content: "",
    commentList: [],
    modalComment: false,
    commentNumberShown: 5,
  };

  componentDidMount() {
    const sneakersId = this.props.match.params.id;
    axios({
      url: `${base_url}/api/sneakers/${sneakersId}`,
      method: "GET",
    })
      .then((data) => {
        this.setState({
          name: data.data.name,
          price: data.data.price,
          image: data.data.image,
          sneakersId: data.data._id,
        });
      })
      .catch((err) => {

      });

    axios({
      method: "GET",
      url: `${base_url}/api/sneakers/${sneakersId}/comment`,
    })
      .then((data) => {
        this.setState({ commentList: data.data.comment.reverse() });
      })
      .catch((err) => {});

    this.setState({ commentNumberShown: 5 });
  }

  render() {
    return (
      <div className="sneakers_detail container">
        <div className="row image_and_description">
          <div className="sneakers_img_detail col-6">
            <img src={this.state.image} alt="" style={{ width: "100%" }} />
          </div>
          <div className="description col-6">
            <div className="sneakers_name_detail">{this.state.name}</div>
            <div className="sneakers_price_detail">
              {this.state.price
                ? this.state.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND"
                : ""}
            </div>

            <div className="sneakers_quantity_detail row">
              <div className="col-8">
                <p>Pairs</p>
              </div>
              <div class="col-4">
                <Input
                  type="number"
                  onChange={this.quantityChange}
                  step={1}
                  min={0}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="sneakers_size_detail row">
              <div class="col-8">
                <p>Size:</p>
              </div>
              <div class="col-4">
                <Dropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.DropDownToggle}
                >
                  <DropdownToggle caret color="info">
                    {this.state.dropDownValue}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header className="text-danger">
                      Note: Cleats are measured in US sizes
                    </DropdownItem>
                    <DropdownItem divider />
                    {[8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12].map(
                      (item, index) => {
                        return (
                          <DropdownItem onClick={this.selectSize}>
                            {item}
                          </DropdownItem>
                        );
                      }
                    )}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="center">
              <Button
                id="btn_add_to_cart"
                type="button"
                onClick={this.addToCartAndDisplayMessage}
              >
                Add to cart
              </Button>
              <Modal
                toggle={this.ModalAddToCartToggle}
                isOpen={this.state.modalAddToCart}
              >
                <ModalHeader toggle={this.ModalAddToCartToggle}></ModalHeader>
                <ModalBody>
                  {this.state.quantity <= 0
                    ? "Please fill in the quantity"
                    : typeof this.state.dropDownValue == "string"
                    ? "Please Choose Your Size"
                    : "This product has been added to your cart"}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="primary"
                    type="button"
                    onClick={this.ModalAddToCartToggle}
                  >
                    OK
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
        </div>

        <div className="comments container">
          <div className="row">
            <div className="comment_text_area col-12">
              <Form onSubmit={this.submitComment}>
                <FormGroup>
                  <Label for="exampleText">Write Your Comment Here</Label>
                  <Input
                    type="textarea"
                    name="text"
                    id="exampleText"
                    onChange={this.commentChange}
                  />
                </FormGroup>
                <Button type="submit">Submit</Button>
                <Modal
                  toggle={this.ModalCommentToggle}
                  isOpen={this.state.modalComment}
                >
                  <ModalHeader toggle={this.ModalCommentToggle}></ModalHeader>
                  <ModalBody>Please sign in to comment</ModalBody>
                  <ModalFooter>
                    <Button onClick={this.toSignInPage} color="primary">
                      Sign in
                    </Button>
                    <Button
                      color="primary"
                      type="button"
                      onClick={this.ModalCommentToggle}
                    >
                      OK
                    </Button>
                  </ModalFooter>
                </Modal>
              </Form>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="commentList col-12">
              {this.state.commentList
                .filter((item, index) => {
                  return index < this.state.commentNumberShown;
                })
                .map((item) => {
                  return (
                    <div className="user_comment row ">
                      <div className="col-2 comment_user_name">
                        {item.user.username}
                      </div>
                      <div className="col-7 comment_content">
                        {item.content}
                      </div>
                      <div className="col-3 comment_date">
                        {moment(item.createdAt).format("lll")}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-5"></div>
            <Button
              className=" btn_view_comment col-2"
              type="button"
              onClick={this.viewMoreComment}
              color="primary"
            >
              View more
            </Button>
            <div className="col-5   "></div>

            <div className="col-5"></div>
            <Button
              className=" btn_view_comment col-2"
              type="button"
              onClick={this.viewLessComment}
              color="danger"
            >
              View less
            </Button>
            <div className="col-5   "></div>
          </div>
        </div>
      </div>
    );
  }

  getCommentList = () => {
    axios({
      method: "GET",
      url: `${base_url}/api/sneakers/${this.state.sneakersId}/comment`,
    })
      .then((data) => {
        this.setState({ commentList: data.data.comment.reverse() });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  viewLessComment = () => {
    this.setState({ commentNumberShown: this.state.commentNumberShown - 5 });
  };
  viewMoreComment = () => {
    this.setState({ commentNumberShown: this.state.commentNumberShown + 5 });
  };

  toSignInPage = () => {
    this.props.history.push("/sign_in");
  };

  submitComment = (event) => {
    event.preventDefault();
    if(this.state.content === "") return;
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) {
      axios({
        url: `${base_url}/api/sneakers/${this.state.sneakersId}/comment`,
        method: "POST",
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        data: {
          content: this.state.content,
        },
      })
        .then(() => {
          this.getCommentList();
        })
        .catch(() => {});
    } else {
      this.setState({ modalComment: !this.state.modalComment });
    }
  };
  commentChange = (event) => {
    const content = event.target.value;
    this.setState({
      content,
    });
  };

  quantityChange = (event) => {
    const quantity = event.target.value;
    this.setState({ quantity: Number(quantity) });
  };

  selectSize = (event) => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      size: event.target.innerText,
      dropDownValue: parseFloat(event.target.innerText),
    });
  };

  DropDownToggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  ModalAddToCartToggle = () => {
    this.setState({ modalAddToCart: !this.state.modalAddToCart });
  };
  ModalCommentToggle = () => {
    this.setState({ modalComment: !this.state.modalComment });
  };

  addToCartAndDisplayMessage = () => {
    //display message
    this.setState({ modalAddToCart: !this.state.modalAddToCart });
    //add to cart
    if (this.state.quantity > 0 && this.state.size) {
      if (window.localStorage.getItem("cart")) {
        var cart = window.localStorage.getItem("cart");
        cart = JSON.parse(cart);
        const isExist = cart.filter((item, index) => {
          if (
            this.state.sneakersId === item.sneakersId &&
            this.state.size === item.size
          ) {
            cart[index].quantity = this.state.quantity;
            return true;
          } else return false;
        })[0];
        if (!isExist) {
          cart.push({
            sneakersId: this.state.sneakersId,
            quantity: this.state.quantity,
            name: this.state.name,
            price: this.state.price,
            size: this.state.size,
          });
        }

        window.localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        const initiate_cart = [];
        window.localStorage.setItem("cart", JSON.stringify(initiate_cart));
        const cart = window.localStorage.getItem("cart");
        const parseCart = JSON.parse(cart);
        parseCart.push({
          sneakersId: this.state.sneakersId,
          quantity: this.state.quantity,
          name: this.state.name,
          price: this.state.price,
          size: this.state.size,
        });
        window.localStorage.setItem("cart", JSON.stringify(parseCart));
      }
    }
  };
}
export default withRouter(SneakersDetail);
