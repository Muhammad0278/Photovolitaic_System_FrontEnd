import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const LoadMapForm = ({ location }) => {
  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="locationName">Location Name</Label>
        <Input
          type="text"
          name="locationName"
          id="locationName"
          defaultValue={location.lat}
        />
      </FormGroup>
      <Button color="primary" type="submit">Save</Button>
    </Form>
  );
};

export default LoadMapForm;
