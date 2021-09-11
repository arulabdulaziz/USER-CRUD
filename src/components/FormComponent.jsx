import React from 'react'
import { FormGroup, Col, Label, Input, Row, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import userValidation from "../validation/userValidation";
const renderField = ({
  input,
  type,
  placeholder,
  label,
  disabled,
  readOnly,
  meta: { touched, error, warning },
}) => (
  <Row>
    <Col md="12">
      <Label htmlFor="{input}" className="col-form-label">
        {label}
      </Label>
    </Col>
    <Col md="12">
      <Input
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
      ></Input>
      {touched &&
        ((error && <p style={{ color: "red" }}>{error}</p>) ||
          (warning && <p style={{ color: "brown" }}>{warning}</p>))}
    </Col>
  </Row>
);
function FormComponent(props) {
    return (
      <>
        <form onSubmit={props.handleSubmit}>
          <FormGroup row>
            <Col md={6}>
              <FormGroup>
                <Field
                  type="text"
                  name="name"
                  component={renderField}
                  label="Name :"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Field
                  type="text"
                  name="address"
                  component={renderField}
                  label="Address :"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Field
                  type="text"
                  name="phone"
                  component={renderField}
                  label="Phone :"
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Field
                  type="text"
                  name="age"
                  component={renderField}
                  label="Age :"
                />
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="12">
              <FormGroup>
                <Button
                  color="dark"
                  type="submit"
                  disabled={props.submitting}
                >
                  Submit
                </Button>
              </FormGroup>
            </Col>
          </FormGroup>
        </form>
      </>
    );
}
const mapStateToProps  = (state) => {
    return {
      initialValues: {
        name: state?.userReducer?.user?.name ?? "",
        address: state?.userReducer?.user?.address ?? "",
        phone: state?.userReducer?.user?.phone ?? "",
        age: state?.userReducer?.user?.name ?? "",
      },
    };
}
FormComponent = reduxForm({
  form: "formAddUser",
  validate: userValidation,
  enableReinitialize: true,
})(FormComponent);
export default connect(mapStateToProps, null)(FormComponent);
