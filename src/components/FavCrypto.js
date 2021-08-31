import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Container,Row,Col,Card,Button,Modal,Form } from 'react-bootstrap';
class FavCrypto extends React.Component {
  constructor() {
    super();
    this.state={
      favList:[],
      showModal:false,
      showSweet:false,
      sweetMsg:'',
      title:'',
      description:'',
      toUSD:'',
      image_url:''

    }
  }
  componentDidMount=async()=> {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-fav?email=${this.props.auth0.user.email}`).then(response=>this.setState({
      favList:response.data[0].currencies
    }))
  }
  delete=async(index)=>{
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${index}?email=${this.props.auth0.user.email}`).then(resopnse=>console.log(resopnse.data))
    this.componentDidMount();
    this.forceUpdate();
  }
  openModal=(currency,index)=>{
    this.setState({
      title:currency.title,
      description:currency.description,
      toUSD:currency.toUSD,
      image_url:currency.image_url,
      id:index,
      showModal:true,
    })
  }
  closeModal=()=>this.setState({showModal:false})
  update=async(id)=>{
    let bData={
      title:this.state.title,
      description:this.state.description,
      toUSD:this.state.toUSD,
      image_url:this.state.image_url
    }

   await axios.put(`${process.env.REACT_APP_SERVER_URL}/update/${id}?email=${this.props.auth0.user.email}`,bData).then(response=>this.setState({showModal:false}))
   this.componentDidMount();
   this.forceUpdate();
  }
  render() {
    return(
     <Container>
       <Row>
         {this.state.favList&&<>
         {this.state.favList.map((currency,index)=><Col key={index} className='m-3'>
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant='top' src={currency.image_url} />
                    <Card.Body>

                        <h3>{currency.title}</h3>
                            <h4>{currency.toUSD}</h4>

                    <Card.Text>
                        {currency.description}
                    </Card.Text>
                    </Card.Body>
                <Card.Footer>
                    <Button className='m-3' variant='danger' onClick={()=>this.delete(index)}>Delete</Button>
                    <Button variant='success' 
                    onClick={()=>this.openModal(currency,index)}>Update</Button>
                </Card.Footer>
                </Card>

                <Modal show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update: {this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Title</Form.Label>
    <Form.Control onChange={(e)=>this.setState({
      title:e.target.value
    })} type="text" defaultValue={this.state.title} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Description</Form.Label>
    <Form.Control onChange={(e)=>this.setState({
      description:e.target.value
    })} type="text" defaultValue={this.state.description} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>ToUSD</Form.Label>
    <Form.Control onChange={(e)=>this.setState({
      toUSD:e.target.value
    })} type="text" defaultValue={this.state.toUSD} />
  </Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={()=>this.update(this.state.id)} >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
            </Col >)}
         </>}
       </Row>
     </Container>
    )
  }
}

export default withAuth0(FavCrypto);
