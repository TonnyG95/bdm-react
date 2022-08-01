import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";


function ProductScreen({ match }) {


  const [product, setProduct] = useState([])
 

  useEffect(()=>{
    

    async function fetchProduct(){
      const {data} = await axios.get(`https://8000-tonnyg95-bdmreact-r8iayrrprcr.ws-eu54.gitpod.io/api/products/${match.params.id}`)
      setProduct(data)
    }
    
    fetchProduct()



  },[])
 
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroupItem>
            <ListGroupItem>Price: €{product.price}</ListGroupItem>

            <ListGroupItem>Description: {product.description}</ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>€{product.price}</strong>
                  </Col>
                </row>
              </ListGroupItem>
            </ListGroup>

            <ListGroupItem>
              <row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </Col>
              </row>
            </ListGroupItem>

            <ListGroupItem>
              <Button
                ClassName="btn-block "
                disabled={product.countInStock == 0}
                type="button"
              >
                Add to cart
              </Button>
            </ListGroupItem>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
