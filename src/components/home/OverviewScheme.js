import React from 'react';
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../../API/api';

const OverviewScheme = () => {
  useEffect(() => {
    apiTesting();
  });

  const apiTesting = ()=>{
    console.log(" process.env.baseURL=",  process.env);
    api.apiTesting()
    .then((res) => {
        console.log("Response==>", res);
    })
    .catch((err) => {
        console.log("error==>", err);
    })
}

    const customStyle = {
        fontFamily: 'Arial, sans-serif', // Change to desired font
        color: '#333', // Custom text color
    };


  return (
    <Container className="my-5">

<Col md={12} className='py-4 pb-5 text-center'>
        <h2><i>Providing Rs. 5 subsidy to farmers pouring milk to Dairy Co-operative Societies</i></h2>
      </Col>

      		<div class="row text-center">
	                <div class="col-md-3 p-1">
	                    <div class="counter">
                            <i class="fa fa-file fa-2x"></i>
                            <h2 class="timer count-title count-number">100</h2>
                            <p class="count-text ">Total Applied</p>
                        </div>
	                </div>
                    <div class="col-md-3 p-1">
                        <div class="counter">
                            <i class="fa fa-check fa-2x"></i>
                            <h2 class="timer count-title count-number">460</h2>
                            <p class="count-text ">Approved</p>
                        </div>
                    </div>
                    <div class="col-md-3 p-1">
                        <div class="counter">
                            <i class="fa fa-inr fa-2x"></i>
                            <h2 class="timer count-title count-number">900</h2>
                            <p class="count-text ">Ammount Paid</p>
                        </div>
                    </div>
                    <div class="col-md-3 p-1">
                        <div class="counter">
                            <i class="fa fa-refresh fa-2x"></i>
                            <h2 class="timer count-title count-number">760</h2>
                            <p class="count-text ">Under Verification</p>
                        </div>
                    </div>
                </div>





         <div class="container py-5">
    <div class="row g-4">
      <div class="col-md-7">
        <Col md={12}>
          <img src="assets/cow.jpg" alt="Overview of the Scheme" className="img-fluid w-100 rounded-corners" />
        </Col>
      </div>
      <div class="col-md-5 d-flex flex-column justify-content-center">
        <h2 class="section-title text-center">Register</h2>
        <p class="about-us-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus semper placerat metus. Cras venenatis mi non purus dictum, non tincidunt ligula varius.</p>
        <div class="row">
          <div class="col-md-6">
            <h5>Our Vision</h5>
            <ul>
              <li>Praesent Sodales Orci</li>
              <li>Curabitur Dignissim</li>
              <li>Nulla Condimentum</li>
            </ul>
          </div>
          <div class="col-md-6">
            <h5>Our Mission</h5>
            <ul>
              <li>Nulla Condimentum</li>
              <li>Praesent Sodales Orci</li>
              <li>Curabitur Dignissim</li>
            </ul>
          </div>
        </div>
        <a href="#" class="btn btn-primary mt-3">Know Us More &rarr;</a>
      </div>
    </div>
  </div>

  
      <Row>
      
        <Col md={12}>
        <Row>
            {/* <Col md={12} className='text-center'>
                <img src="assets/scheme-overview.png" alt="Overview of the Scheme" className="img-fluid" />
            </Col>
 */}

            <Col md={12}>
            <Card>
            <Card.Body>
              {/* <Card.Title style={customStyle} className="text-center"><u>PROPOSED IMPLEMENTATION STRATEGY FOR THE SCHEME</u></Card.Title> */}
              
              <Row style={customStyle} className="mb-1">
                <Col>
                <h4><u>PROPOSED IMPLEMENTATION STRATEGY FOR THE SCHEME</u></h4>
                  <h5 style={customStyle}>Proposed Strategy of Implementation:</h5>
                  <p style={customStyle}>
                  <ol>
                    <li>The scheme will be implemented in Direct Benefit Transfer (DBT) mode.</li>
                    <li>Data of the beneficiaries will be collected in prescribed format and approved by the District Level Committee (DLC) of respective districts.</li>
                    <li>The final approved list will be uploaded in the portal.</li>
                    <li>The State Level Selection Committee will accord final approval.</li>
                    <li>The disbursal of the amount for approved beneficiary will be done through DBT.</li>
                  </ol>
                  </p>
                </Col>
              </Row>

              <Row className="mb-1">
                <Col>
                  <h5 style={customStyle}>Eligibility Criteria:</h5>
                  <p style={customStyle}>
                  <ol>
                    <li>Farmer should be a pouring member of a functional DCS formed on or before 31st March, 2024 (as per Assam Co-operative Societies Act, 2007).</li>
                  </ol>
                  </p>
                </Col>
              </Row>
            </Card.Body>
            </Card>
            </Col>
            
        </Row>
          
        </Col>
        <Col md={12}>
          <Card>
            <Card.Body>
              {/* <Card.Title className="text-center"><u>OVERVIEW OF THE SCHEME</u></Card.Title> */}
              
              <Row className="mb-4">
                <Col>
                <h4><u>OVERVIEW OF THE SCHEME</u></h4>
                  <h5 style={customStyle}>Genesis of the scheme:</h5>
                  <p style={customStyle}>
                    As announced by Hon’ble Chief Minister at the inauguration of National Farming Conclave in Guwahati, Rs 5 per liter of milk per day is to be provided to farmers selling milk through dairy co-operative society.
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-4">
                <Col>
                  <h5 style={customStyle}>Objective of the scheme:</h5>
                  <p style={customStyle}>
                    To encourage formalization of dairy sector in Assam and compensate the dairy farmers against high cost of milk production such that the locally produced milk could compete with the cheap imported milk from other states of India.
                  </p>
                </Col>
              </Row>
              
              <Row className="mb-4">
                <Col>
                  <h5 style={customStyle}>Justification for requirement of Rs. 2500 lakh</h5>
                  <p style={customStyle}>As per data received from Department of Co-operation:</p>
                  <ol style={customStyle}>
                    <li>308 functional DCS with milk data are available (excluding 8 nos. 6th schedule areas)</li>
                    <li>Approximately, 10437 dairy farmers are associated with the 308 DCS</li>
                    <li>Approximately, 1.33 lakh litres of milk is marketed through the above mentioned DCS per day</li>
                    <li>
                      Therefore, 1.33 L x Rs. 5 x 365 days = Rs. 2430 lakh i.e. ~ Rs. 2500 lakh is required to implement the scheme
                    </li>
                  </ol>
                </Col>
              </Row>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OverviewScheme;
