import React, { useEffect } from "react";
import { Container, Spinner } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { fetchUser, isFetchUsers, setUser } from "../store/action/userAction";
import { connect } from "react-redux";
import FormComponent from "../components/FormComponent";
import axios from "../axios/axios";
import swal from "sweetalert";
function EditPage(props) {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    props.fetchUser(id);
    return () => {
      props.setUser(null);
    };
  }, []);
  async function handleSubmit(payload) {
    try {
      const { data } = await axios({
        url: "users/" + id,
        data: payload,
        method: "PUT",
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
  const { loading, error, user } = props;
  if (loading) {
    return (
      <div className="text-center">
        <Spinner color="dark" />
      </div>
    );
  } else if (error) {
    return (
      <div className="text-center">
        <p>{JSON.stringify(error)}</p>
      </div>
    );
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
const mapStateToProps = (state) => {
  return {
    error: state.userReducer.userError,
    loading: state.userReducer.loadingUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    isFetchUsers: (value) => dispatch(isFetchUsers(value)),
    fetchUser: (id) => dispatch(fetchUser(id)),
    setUser: (data) => dispatch(setUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
