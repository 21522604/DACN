import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

export default function App() {
  const [field, setField] = useState([]);

  return (
    <Form.Group as={Col} controlId="my_multiselect_field">
      <Form.Label>My multiselect</Form.Label>
      <Form.Control as="select" multiple value={field} onChange={e => setField([].slice.call(e.target.selectedOptions).map(item => item.value))}>
        <option value="field1">Field 1</option>
        <option value="field2">Field 2</option>
        <option value="field3">Field 3</option>
      </Form.Control>
    </Form.Group>
  );
}