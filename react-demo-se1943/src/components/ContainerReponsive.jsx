import { Container, Row, Col } from "react-bootstrap";
const ContainerResponsive = () => {
  return (
    <Container fluid>
        <Row>
            <Col sm={4}>
                <h1>SM4 Responsive Container</h1>
            </Col>
            <Col sm={8}>
                <h1>SM8 Responsive Container</h1>
            </Col>
        </Row>
        <Row>
            <Col sm={8}>
                <p>SM8: This container adjusts its size based on the screen size using React Bootstrap's responsive grid system.</p>
            </Col>
            <Col sm={4}>
                <p>SM4: This container adjusts its size based on the screen size using React Bootstrap's responsive grid system.</p>
            </Col>
        </Row>
    </Container>
  )
}   
export default ContainerResponsive;