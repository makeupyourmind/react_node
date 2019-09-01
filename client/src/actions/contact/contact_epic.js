import * as ACTION from '../types';

export const getAllContactsAction = () => {
    return {
        type: ACTION.GET_ALL_CONTACTS
    };
}

export const getAllContactActionSuccess = payload => {
    return {
        type: ACTION.GET_ALL_CONTACTS_SUCCESS,
        payload
    };
}

export const getContactByIdAction = () => {
    return {
        type: ACTION.GET_CONTACT_BY_ID
    }
}

export const getContactByIdActionSuccess = payload => {
    return {
        type: ACTION.GET_CONTACT_BY_ID_SUCCESS,
        payload
    }
}

export const failedGetAllContactAction = err => {
    return {
        type: ACTION.FAILED_GET_ALL_CONTACTS,
        err
    };
}

export const editContactByIdActionSuccess = payload => {
    return {
        type: ACTION.EDIT_CONTACT_SUCCESS,
        payload
    }
}
export const faildeEditContactByIdAction = err => {
    return {
        type: ACTION.FAILED_EDIT_CONTACT,
        err
    }
}

export const addContactActionSuccess = payload => {
    return {
        type: ACTION.ADD_CONTACT,
        payload
    }
}

export const failedAddContactAction = err => {
    return {
        type: ACTION.FAILED_ADD_CONTACT,
        err
    };
}

export const deletedContactActionSuccess = (id) => {
    return {
        type: ACTION.DELETED_CONTACT_SUCCESS,
        id
    }
}

export const failedDeleteContactAction = err => {
    return {
        type: ACTION.FAILED_DELETE_CONTACT,
        err
    }
}

export const searchContactActionSuccess = payload => {
    return {
        type: ACTION.SEARCH_CONTACT_SUCCESS,
        payload
    }
}