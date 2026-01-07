import { Button } from "react-bootstrap";
const ButtonComponent = () => {
    const onClick = () => {
        alert("Button clicked!");
    };
  return (
    <>
      <Button variant={"primary"} onClick={onClick}>
        {"primary  "}
      </Button> {" "}
      <Button variant={"secondary"} onClick={onClick}>
        {"secondary  "}
        </Button>{" "}
      <Button variant={"success"} onClick={onClick}>
        {"success  "}
      </Button>
      <Button variant={"danger"} onClick={onClick}>
        {"danger  "}
      </Button> {" "}
      <Button variant={"warning"} onClick={onClick}>
        {"warning  "}
      </Button>{" "}
      <Button variant={"info"} onClick={onClick}>
        {"info  "}
      </Button>
    </>
  );
};
export default ButtonComponent;