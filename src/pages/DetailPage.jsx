import React, {  useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Table, Spinner } from "reactstrap";
import BackComponent from "../components/BackComponent";
import { connect } from "react-redux";
import { fetchUser, setUser } from "../store/action/userAction";
function DetailPage(props) {
  const {id} = useParams()
  useEffect(() => {
    props.fetchUser(id)
    return () => {
      props.setUser(null);
    };
  }, []);
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
        <div className="bg-dark text-center w-100 text-light">
          <p>Detail</p>
        </div>
        <Table striped>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user?.id ?? "-"}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user?.name ?? "-"}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{user?.address ?? "-"}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{user?.phone ?? "-"}</td>
            </tr>
            <tr>
              <th>Age</th>
              <td>{user?.age ?? "-"}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    error: state.userReducer.userError,
    loading: state.userReducer.loadingUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    setUser: (data) => dispatch(setUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);
