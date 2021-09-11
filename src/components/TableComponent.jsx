import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Spinner, Row, Col, Modal } from "reactstrap";
import {
  faInfo,
  faEdit,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { connect } from "react-redux";
import { fetchUsers, setUsers, setLoadingUsers, isFetchUsers } from "../store/action/userAction";
import swal from "sweetalert";
import axios from "./../axios/axios"
const TableComponent = (props) => {
  const { SearchBar } = Search;
  const searchTerm = useRef("");
  const basicRow = (value, item) => {
    return <div style={{ wordWrap: "break-word" }}>{value}</div>;
  };
  const deleteUser = async (id) => { 
    try {
      const willDeleted = await swal({
        title: "Are you sure wanna delete this user?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        showConfirmButton: false,
        showLoaderOnConfirm: true,
      });
      if (willDeleted) {
        const {data} = await axios({
          method: "DELETE",
          url: "users/"+id
        })
        props.isFetchUsers(true)
        props.fetchUsers()
      }
    } catch (error) {
      swal({
        title: "Error",
        text: JSON.stringify(error),
        icon: "error",
      });
    }
  };
  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: () => {
        return {
          width: "5%",
        };
      },
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      formatter: (rowContent, row) => {
        return basicRow(rowContent, row);
      },
      sort: true,
    },
    {
      dataField: "address",
      text: "Adrdress",
      formatter: (rowContent, row) => {
        return basicRow(rowContent, row);
      },
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      formatter: (rowContent, row) => {
        return basicRow(rowContent, row);
      },
      sort: true,
    },
    {
      dataField: "action",
      text: "Action",
      headerStyle: () => {
        return {
          width: "30%",
          wordWrap: "break-word",
        };
      },
      formatter: (rowContent, row) => {
        return (
          <div>
            <Link to={`/detail/${row.id}`}>
              <Button color="dark" className="mr-2 mb-1 mb-md-0">
                <FontAwesomeIcon icon={faInfo} /> Detail
              </Button>
            </Link>
            <Link to={`/edit/${row.id}`}>
              <Button color="dark" className="mr-2 mb-1 mb-md-0">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
            </Link>
            <Button
              color="dark"
              className="mr-2 mb-1 mb-md-0"
              onClick={() => deleteUser(row.id)}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </div>
        );
      },
    },
  ];
  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];
  useEffect(() => {
    props.fetchUsers();
  }, []);
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner color="dark" />
      </div>
    );
  } else if (props.error) {
    return (
      <div className="text-center">
        <p>{JSON.stringify(props.error)}</p>
      </div>
    );
  }
  return (
    <>
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={props.users}
        columns={columns}
        defaultSorted={defaultSorted}
        search
      >
        {(props) => (
          <div>
            <Row>
              <Col>
                <Link to="/add">
                  <Button color="dark" className="mr-2">
                    <FontAwesomeIcon icon={faUserPlus} /> Create User
                  </Button>
                </Link>
              </Col>
              <Col>
                <div className="float-right">
                  <SearchBar {...props.searchProps} placeholder="Search .." />
                </div>
              </Col>
            </Row>
            <BootstrapTable
              {...props.baseProps}
              pagination={paginationFactory()}
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
    loading: state.userReducer.loadingUsers,
    error: state.userReducer.errorUsers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    setLoadingUsers: (value) => dispatch(setLoadingUsers(value)),
    setUsers: (value) => dispatch(setUsers(value)),
    isFetchUsers: (value) => dispatch(isFetchUsers(value)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
