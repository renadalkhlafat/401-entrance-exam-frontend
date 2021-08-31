import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Container,Row } from 'react-bootstrap';
import axios from 'axios';
import CryptoCard from './CryptoCard';
class Home extends React.Component {
constructor() {
  super()
  this.state={
    currencyList:[],
  }
}
  componentDidMount=async() =>{
  await axios.get(`${process.env.REACT_APP_SERVER_URL}/get-currencies`).then(response=>this.setState({
    currencyList:response.data
  })) 
  }

  addToFav=async(index)=>{
    let data={
      title:this.state.currencyList[index].title,
      description:this.state.currencyList[index].description,
      toUSD:this.state.currencyList[index].toUSD,
      image_url:this.state.currencyList[index].image_url
    }

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/add-fav?email=${this.props.auth0.user.email}`,data).then(response=>console.log(response.data))
  }
  render() {
    return (
      <Container>
        <Row>
          {this.state.currencyList && <>
          {
            this.state.currencyList.map((currency,index)=><CryptoCard index={index} currency={currency} addToFav={this.addToFav}/>)
          }
          </>}
        </Row>
      </Container>
    )
  }
}

export default withAuth0(Home);
