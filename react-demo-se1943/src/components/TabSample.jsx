import { Tab, Tabs } from "react-bootstrap";
const TabSample = () => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="home" title="Home">
        <p>This is the home tab content.</p>
      </Tab>
        <Tab eventKey="profile" title="Profile">
          <p>This is the profile tab content.</p>
        </Tab>
        <Tab eventKey="contact" title="Contact">
            <p>This tab is disabled.</p>
        </Tab>
        <Tab eventKey="about" title="About" disabled>
            <p>This is the about tab content.</p>
        </Tab>
    </Tabs>
  );
}
export default TabSample;