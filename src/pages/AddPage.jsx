import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import BackComponent from "../components/BackComponent";
import FormComponent from "../components/FormComponent";
import axios from "../axios/axios";
import swal from "sweetalert";
import { isFetchUsers } from "./../store/action/userAction";
function AddPage(props) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(payload) {
    try {
      const { data } = await axios({
        url: "users",
        data: payload,
        method: "POST",
      });
      props.isFetchUsers(true);
      history.replace("/");
    } catch (error) {
      swal({
        title: "Error",
        text: JSON.stringify(error),
        icon: "error",
      });
    }
  }
  return (
    <>
      <Container>
        <BackComponent />
        <FormComponent onSubmit={(data) => handleSubmit(data)} />
      </Container>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    isFetchUsers: (value) => dispatch(isFetchUsers(value)),
  };
};
export default connect(null, mapDispatchToProps)(AddPage);
