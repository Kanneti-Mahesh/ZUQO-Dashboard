import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function CardComponent() {

    const styles={
        marginLeft:'20px',
        border:'1px solid #d3d3d3',
        borderRadius:'5px',
        color:'grey',
        boxShadow:'-1px 1px 5px #d3d3d3',
    }

  return (
    <CardGroup>
      <Card style={styles} className='cards'>
        <Card.Body>
          <Card.Title> Card </Card.Title>
          <Card.Text style={{color:"black",fontWeight:400,fontSize:"22px"}}>
                0
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={styles} className='cards'>
        <Card.Body>
          <Card.Title> Card </Card.Title>
          <Card.Text style={{color:"black",fontWeight:400,fontSize:"22px"}}>
                0
          </Card.Text>
        </Card.Body>
      </Card>
      <Card style={styles} className='cards'>
        <Card.Body>
          <Card.Title> Card </Card.Title>
          <Card.Text style={{color:"black",fontWeight:400,fontSize:"22px"}}>
                0
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

export default CardComponent;