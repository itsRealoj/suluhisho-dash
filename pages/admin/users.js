import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import { motion } from 'framer-motion';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import SearchComponent from 'components/Search/Search.js';
import ManageUser from 'components/Menu/viewUserMenu.js';
import { useRouter } from 'next/router';
import PageLoad from 'components/PageLoad/PageLoad.js';

export default function Reports() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const containerVariants = {
    hidden: {
      opacity: 0.5,
      scale: 1.1,
      y: 10,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { delay: 0, duration: 0.5 },
    },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let searchVal = e.target.value.toLowerCase();
    searchUserByName(searchVal);
  };

  const handleChangePage = (event, newPage) => {
    newPage > page ? fetchNextUsers() : fetchPreviousUsersList();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchUsers();
  };

  const usersTotal = () => {
    firestore
      .collection('users')
      .get()
      .then((snap) => {
        setTotalUsers(snap.size);
      });
  };

  const fetchNextUsers = async () => {
    const usersArr = [];
    setPageLoading(true);

    firestore
      .collection('users')
      .orderBy('name')
      .startAfter(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentUser = alert.data();
          currentUser.id = alert.id;
          usersArr.push(currentUser);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      })
      .catch((error) => {
        console.error(error);
        setPageLoading(false);
      });
  };

  const fetchPreviousUsersList = async () => {
    const usersArr = [];
    setPageLoading(true);
    firestore
      .collection('users')
      .orderBy('name')
      .endBefore(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentUser = alert.data();
          currentUser.id = alert.id;
          usersArr.push(currentUser);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      })
      .catch((error) => {
        console.error(error);
        setPageLoading(false);
      });
  };

  const fetchUsers = async () => {
    setPageLoading(true);
    const usersArr = [];
    firestore
      .collection('users')
      .orderBy('name')
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          let currentUser = user.data();
          currentUser.id = user.id;
          usersArr.push(currentUser);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      });
  };

  const searchUserByName = async (searchValue) => {
    setPageLoading(false);
    const usersArr = [];
    firestore
      .collection('users')
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          let currentUser = user.data();
          currentUser.id = user.id;
          if (currentUser.name?.toLowerCase().includes(searchValue))
            usersArr.push(currentUser);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      });
  };

  useEffect(() => {
    fetchUsers();
    usersTotal();
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return isUserLoggedIn ? (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <h4 className={classes.cardTitleWhite}>Users</h4>
                  <p className={classes.cardCategoryWhite}>
                    View and Manage all users.
                  </p>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    variant="contained"
                    onClick={() => router.push('add-user')}
                  >
                    Add User
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <Divider />
            {pageLoading ? <PageLoad /> : null}
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <SearchComponent handleSearch={handleSearch} />
                </GridItem>
              </GridContainer>
              <Paper style={classes.root}>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    'Name',
                    'Phone',
                    'NationalID',
                    'Email',
                    'County',
                    'Sub-County',
                    'Profile Pic',
                    'Action',
                  ]}
                  tableData={users.map((userData) => [
                    userData.name,
                    userData.phone,
                    userData.nationalID,
                    userData.email,
                    userData.county,
                    userData.subCounty,
                    userData.profilePicture,
                    <ManageUser userData={userData} fetchUsers={fetchUsers} />,
                  ])}
                />
              </Paper>
            </CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10} container justify="center">
                <TablePagination
                  component="div"
                  count={totalUsers}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2} container></GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
    </motion.main>
  ) : null;
}

// styles
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: '#434444',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#434444',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '500',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  pagination: {
    padding: '10px',
  },
};

Reports.layout = Admin;
