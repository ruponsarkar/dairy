import React, { useEffect, useState } from "react";
import api from "../../API/api";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Container, Row, Col } from 'react-bootstrap';

const CountStatus = ({user}) => {
  // countStatus

  const [count, setCount] = useState({});
  // const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  useEffect(() => {
    if(user){
    api
      .countStatus(user)
      .then((res) => {
        if(res.status==200 && res.data.message){
          setCount(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [user]);

  const cardsData = [
    { color: '#66BB6A', icon: 'fa fa-file', title: 'DCS/Dairy Farmers', total: count.farmers+'/'+count.farmers+'Nos.' },
    { color: '#AB47BC', icon: 'fa fa-check',title: 'Milk Collection', total: count.tot_milk_amount+'L' },
    { color: '#42A5F5', icon: 'fa fa-plus',title: 'Subsidy Amount',total: '₹'+count.total_amount+'.00', },
    { color: '#ffa500', icon: 'fa fa-refresh',title: 'Current Months Milk', total: count?.current_month_milk+'L' },
  ];

  return (
    <>
    <Container className="p-0 m-0">
      <Row className="pb-0">
        {cardsData.map((card, index) => (
          <Col xs={12} md={6} lg={3} key={index}>
            <Card className="shadow-lg  rounded" style={{ backgroundColor: card.color, color: '#fff', marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.title}
                </Typography>
                <Typography variant="h4" component="div">
                  {card.total}
                </Typography>
                {/* <Typography variant="body2">
                  Last Month
                </Typography> */}
                <i className={card.icon} style={{ fontSize: '2rem', position: 'absolute', top: '10px', right: '10px', opacity: 0.3, paddingRight: '10px' }}></i>
              </CardContent>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    
    </>
  );
};

export default CountStatus;
