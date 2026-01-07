import 'bootstrap/dist/css/bootstrap.min.css'

const ContainerSample = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-3">
                <h2>Welcome to the Container Sample</h2>
                <p>This is a simple example of using Bootstrap's container, row, and column classes in a React component.</p>
            </div>
            <div className="col-3">
                <h1>Column 2</h1>
                <p>This is the second column in the row.</p>
            </div>
            <div className="col-3">
                <h1>Column 3</h1>
                <p>This is the third column in the row.</p>
            </div>
        </div>
    </div>
  );
}
export default ContainerSample;