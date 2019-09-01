import API from "../../services/api";
import { 
            getAllContactsAction, 
            getAllContactActionSuccess,
            getContactByIdAction, 
            getContactByIdActionSuccess,
            failedGetAllContactAction,
            editContactByIdActionSuccess,
            faildeEditContactByIdAction,
            addContactActionSuccess, 
            failedAddContactAction,
            deletedContactActionSuccess,
            failedDeleteContactAction,
            searchContactActionSuccess
        } from "./contact_epic";

export const getAllContacts = () => {

    return dispatch => {
        dispatch(getAllContactsAction());
        return API.get("/contacts", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
              }
        })
        .then(res => {
            dispatch(getAllContactActionSuccess(res));
        })
        .catch(error => {
            dispatch(failedGetAllContactAction("Error"));
            throw new Error(error);
        })
    };
}

export const getContactById = (id) => {
    return dispatch => {
        dispatch(getContactByIdAction());
        return API.get(`/contacts/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
              }
        })
        .then(res => {
            console.log("res : ", res.data);
            dispatch(getContactByIdActionSuccess(res.data));
        })
        .catch(error => {
            dispatch(failedGetAllContactAction("Error"));
            throw new Error(error);
        })
    };
}

export const editContactById = (id, name, age, number) => {
    return dispatch => {
        console.log("token", localStorage.getItem('token'));
        const data = {
            name, 
            age,
            number
          };
        const config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json',
            }
          };
        return API.patch(`/contacts/${id}`, data, config)
        .then(res => {
            console.log("res after edit: ", res.data);
            dispatch(editContactByIdActionSuccess(res.data));
        })
        .catch(error => {
            console.log("error : ", error.message)
            dispatch(faildeEditContactByIdAction("Error"));
            throw new Error(error);
        })
    };
}


export const addContact = (name, number, age, userId) => {
    return dispatch => {
        return API.post("/contacts", {
            name,
            age,
            number,
            userId
        })
        .then(res => {
            dispatch(addContactActionSuccess(res.data));
        })
        .catch(error => {
            dispatch(failedAddContactAction("Error"));
            throw new Error(error);
        })
    };
}


export const deleteContact = (id, userId) => {
    console.log("userId : ", userId)
    return dispatch => {
        return API.delete(`/contacts/${id}`, {
            data: {
                userId
            }
        })
        .then(res => {
            // console.log("res delete", res)
            dispatch(deletedContactActionSuccess(id));
        })
        .catch(error => {
            dispatch(failedDeleteContactAction("Error"));
            throw new Error(error);
        })
    }
}

export const search = (value) => {
    return dispatch => {
        console.log("value : ", value);
        return API.get(`/contacts/search`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                value
            }
        })
        .then(res => {
            console.log("res search", res.data.find)
            dispatch(searchContactActionSuccess(res.data.find));
        })
    }
}