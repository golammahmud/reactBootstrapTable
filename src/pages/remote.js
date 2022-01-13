import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";
import mocdata from "../component/MOCK_DATA.json";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Modal, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory, {
  textFilter,
  numberFilter,
  Comparator,
  selectFilter,
} from "react-bootstrap-table2-filter";
import "../index.css";

import overlayFactory from "react-bootstrap-table2-overlay";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";


function RemoteTable() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [editIndex, setEditIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  console.log(editData);
  // console.log(data);
  //   create get data function from api
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.log(error));
  }, []);


  const selectOptions = {
    0: 'true',
    1: 'false',
   
  };
  
  const selectComparator = (filter, row, column) => {
    return selectFilter(filter, row[column], row, column);
  };
  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
      hidden: true,
    },
    {
      dataField: "userId",
      text: "UserId",
      sort: true,
      headerTitle: (column, colIndex) =>
        `this is custom title for ${column.userId}`,
      style: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "18px",
        width: "80%",
      },
      headerStyle: (column, colIndex) => {
        return {
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          width: "80%",
        };
      },
      filter: textFilter(),
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          alert("Click on Product ID field");
        },
        onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          console.log("onMouseEnter on Product ID field");
        },
      },
    },
    {
      dataField: "title",
      text: "Title",
      sort: true,
      filter: textFilter(),
      // events: {
      //   onClick: (e, column, columnIndex, row, rowIndex) => {
      //     console.log(e);
      //     console.log(column);
      //     console.log(columnIndex);
      //     console.log(row);
      //     console.log(rowIndex);
      //     alert("Click on Title field");
      //   },
      //   onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
      //     console.log(e);
      //     console.log(column);
      //     console.log(columnIndex);
      //     console.log(row);
      //     console.log(rowIndex);
      //   },
      // },
      headerEvents: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          alert("Click on HEADER Title field");
        },
      },

      editable: true,
      // classes: ["text-center text-wrap"],
      // className: "text-center text-wrap sm:text-sm overflow-hidden truncate ... ",
      classes: (cell, row, rowIndex, columnIndex) => {
        return "text-center text-wrap sm:text-sm overflow-hidden truncate ... ";
      },
      attrs: {
        title: "Click on Title field",
        style: {
          width: "100px",

          // backgroundColor: "red",

          // color: "white",

          // fontSize: "20px",

          // fontWeight: "bold",

          // textAlign: "center",

          // textDecoration: "underline",

          // textTransform: "uppercase",

          // textOverflow: "ellipsis",

          // whiteSpace: "nowrap",

          overflow: "hidden",

          // display: "inline-block",

          verticalAlign: "middle",

          // lineHeight: "normal",
        },
      },
    },
    {
      dataField: "completed",
      text: "Completed",
      sort: true,
      filter: textFilter(),
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleEdit = (index, data) => {
    setEditData(data);
    setEditIndex(index);
    setEditMode(true);
    handleShow();
  };
  const handleDelete = (index, data) => {
    setEditData(data);
    setEditIndex(index);
    setEditMode(false);
    handleShow();
  };
  const handleSave = () => {
    if (editMode) {
      data[editIndex] = editData;
    } else {
      data.push(editData);
    }
    setData(data);
    setEditData({});
    setEditIndex(0);
    setEditMode(false);
    handleClose();
  };
  const handleCancel = () => {
    setEditData({});
    setEditIndex(0);
    setEditMode(false);
    handleClose();
  };
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheck = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.checked,
    });
  };
  const handleSelect = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const handleNumber = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(row);
      console.log(isSelect);
      console.log(rowIndex);
      console.log(e);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log(isSelect);
      console.log(rows);
      console.log(e);
    },
  };

  const expandRow = {
    renderer: (row) => (
      <div className="grid justify-center align-center space-y-2">
        {console.log(row)}
        <p>
          UserId:<span className="text-red-700">{row.userId}</span>
        </p>
        <p className="text-center text-lg text-current text-gray-900 font-serif font-">
          {row.title}
        </p>
        <p className="text-red-700">{row.completed}</p>
      </div>
    ),
    showExpandColumn: true,
    // expandHeaderColumnRenderer: () => <strong>+</strong>,
    // expandColumnRenderer: () => <strong>+</strong>,
    // nonExpandableColumnKeys: ["id", "userId", "title", "completed"],
    expandColumnRenderer: ({ expanded }) => {
      return expanded ? <strong>-</strong> : <strong>+</strong>;
    },
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      return isAnyExpands ? <strong>-</strong> : <strong>+</strong>;
    },
    expandByColumnOnly: true,
    onlyOneExpanding: true,
    expandColumnPosition: "right",
    onExpand: (row, isExpand, rowIndex, e) => {
      console.log(row.id);
      console.log(isExpand);
      console.log(rowIndex);
      console.log(e);
    },
    onExpandAll: (isExpandAll, rows, e) => {
      console.log(isExpandAll);
      console.log(rows);
      console.log(e);
    },
    parentClassName: "bg-red-400",
    // className: 'bg-red-200',

    // expandColumnClassName: 'bg-red-200',
  };

  const options = {
    page: 1,
    // sizePerPage: 5,
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
  };
  const overlay = overlayFactory({
    spinner: true,
    styles: {
      overlay: (base) => ({
        ...base,
        background: "rgba(255, 255, 255, 0.5)",
      }),
      spinner: (base) => ({
        ...base,
        borderTopColor: "rgba(255, 255, 255, 0.5)",
      }),
    },
  });

  const CaptionElement = () => (
    <h3
      style={{
        borderRadius: "0.25em",
        textAlign: "center",
        color: "purple",
        border: "1px solid purple",
        padding: "0.5em",
      }}
    >
      {" "}
      This is remote table compoment
    </h3>
  );
  return (
    <div>
      {/* <h2 className="space-y-6 grid text-center justify-center">
        This is remote table compoment{" "}
      </h2> */}
      <div>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          selectRow={selectRow}
          expandRow={expandRow}
          caption={<CaptionElement />}
          pagination={paginationFactory(options)}
          filter={filterFactory()}
          // overlay={overlayFactory()}
          cellEdit={cellEditFactory({
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: (oldValue, newValue, row, column) => {
              console.log(oldValue, newValue, row, column);
              setEditData(row);
              setEditIndex(data.indexOf(row));
              setEditMode(true);
            },

            beforeSaveCell: (oldValue, newValue, row, column) => {
              console.log(oldValue, newValue, row, column);
              setEditData(row);
              setEditIndex(data.indexOf(row));
              setEditMode(true);
            },
          })}
          bootstrap4
          striped
          hover
          condensed
          noDataIndication="No data to display"
          responsive
          wrapperClasses="table-responsive"
          headerWrapperClasses="thead-dark"
          bodyWrapperClasses="table-responsive"
          rowstyle={(row, rowIndex) => {
            return {
              backgroundColor: rowIndex % 2 === 0 ? "#F5F5F5" : "#FFFFFF",
            };
          }}
          rowclass="table-responsive text-center"
        />
      </div>
    </div>
  );
}

export default RemoteTable;
