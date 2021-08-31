import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
class CryptoCard extends React.Component {

    render() {
        const { currency, index,addToFav } = this.props;
        return (
            <Col key={index} className='m-3'>
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
                    <Button onClick={()=>addToFav(index)} >Add To Watch list</Button>
                </Card.Footer>
                </Card>
            </Col >
        );
    }
}

export default CryptoCard;