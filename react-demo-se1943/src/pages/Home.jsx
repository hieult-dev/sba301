import ContainerSample from "../components/ContainerSample";
import 'bootstrap/dist/css/bootstrap.min.css'
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ConttainerReactBootStrap from "../components/ContainerReactBootStrap";
import { Alert, Card } from "react-bootstrap";
import AlertSample from "../components/AlertSample";
import ButtonComponent from "../components/ButtonSample";
import CardSample from "../components/CardSample";
import NavbarSample from "../components/NavbarSample";
import TabSample from "../components/TabSample";

const Home = () => {
  return (
    <div className="container-fluid">
      <TabSample />
       <AlertSample />
       <ButtonComponent/>
       <CardSample/>
    </div>
  );
}
export default Home;