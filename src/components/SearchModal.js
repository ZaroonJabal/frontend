import React, { useState } from "react";
import { Form, Modal, Col, Row, InputGroup, ListGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { getCompanies } from "../api";
import { useAppStore } from "../stores/AppStore";

export default function SearchModal({
  show,
  text,
  setShow,
  setText,
  handleClose,
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [companiesList, setcompaniesList] = useState([]);
  const [fetchedListIsEmpty, setFetchedListIsEmpty] = useState(false);
  const { setSearchItem, setErrorMessage } = useAppStore();

  const handleCompanyItemClick = (item) => {
    handleClose();
    setText(item.title);
    setSearchItem(item);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await getCompanies(text);
      console.log(response.data);
      response.data.length === 0
        ? setFetchedListIsEmpty(true)
        : setFetchedListIsEmpty(false);
      setcompaniesList(response.data);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      handleClose();
      setErrorMessage(error.response.data.error);
    }
    setIsSearching(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !isSearching) {
      handleSearch();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <Search />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search..."
                aria-label="searcg"
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={handleKeyDown}
                autoFocus={true}
              />
            </InputGroup>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                {fetchedListIsEmpty ? (
                  <div className="text-center">No Data</div>
                ) : (
                  companiesList?.map((item, index) => (
                    <ListGroup.Item
                      key={`${item}: ${index}`}
                      onClick={() => handleCompanyItemClick(item)}
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
              {}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
