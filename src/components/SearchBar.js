import React, { useState } from "react";

import {
  Form,
  Col,
  Row,
} from "react-bootstrap";
import SearchModal from "./SearchModal";

function SearchBar() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleClose = () => setShow(false);
  const handleShowModal = () => setShow(true);

  return (
    <div className="container p-4">
      <Row>
        <Col xs=" auto col-6">
          <Form.Control
            type="text"
            placeholder="Company No."
            className="mr-sm-2"
            value={text}
            onClick={handleShowModal}
            autoFocus={true}
          />
        </Col>
      </Row>

      <SearchModal
        show={show}
        text={text}
        setText={setText}
        handleClose={handleClose}
        // setData={setData}
        // setErrorMessage={setErrorMessage}
        // apiFunction={apiFunction}
      />
    </div>
  );
}

export default SearchBar;
