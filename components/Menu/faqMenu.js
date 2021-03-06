import React, {useState} from 'react'
import { useRouter } from 'next/router';
import Button from 'components/CustomButtons/Button.js';
import { MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { firestore } from '../../firebase';

const useStyles = makeStyles({
  btn: {
    float: 'right'
  }
})

export default function HandleManageFAQData (props){
    const {fetchFAQs, faq} = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleEdit = (faq) => {
        localStorage.setItem('faq', JSON.stringify(faq));
        router.push('manage-faq');
        setAnchorEl(null);
    };
    
    const handleDelete = (faq) => {
        firestore
        .collection('faqs')
        .doc(faq.id)
        .delete()
        .then(() => {
            alert('FAQ deleted!');
            fetchFAQs();
        })
        .catch((error) => {
          alert('error deleting FAQ!');
            console.log('error deleting FAQ....', error);
            fetchFAQs();
        });
        setAnchorEl(null);
    };
    
    
    
    
    return(
    <>
      <Button
        size="sm"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.btn}
      >
        <MoreVert />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEdit(faq)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(faq)}>Delete</MenuItem>
      </Menu>
    </>
  )};
