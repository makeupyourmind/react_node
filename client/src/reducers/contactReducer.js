import * as ACTION from '../actions/types';

const initialState = {
  contacts: [],
  contact: {},
  loading: false,
  err: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_ALL_CONTACTS: 
           return {
                ...state,
                loading: true
        }
        case ACTION.GET_ALL_CONTACTS_SUCCESS: 
           return {
                contacts: action.payload.data,
                loading: false
        }
        case ACTION.FAILED_GET_ALL_CONTACTS: {
            return {
                ...state,
                err: action.err,
                contacts: []
            }
        }
        case ACTION.GET_CONTACT_BY_ID: {
            return {
                ...state,
                loading: true
            }
        }
        case ACTION.GET_CONTACT_BY_ID_SUCCESS: {
            return {
                ...state,
                loading: false,
                contact: action.payload
            }
        }
        case ACTION.EDIT_CONTACT_SUCCESS : {
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ?  {...contact } : contact)
            }
        }
        case ACTION.FAILED_EDIT_CONTACT : {
            return {
                contact: {},
                err: action.err
            }
        }
        case ACTION.ADD_CONTACT: {
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
                // contact: action.payload
            }
        }
        case ACTION.FAILED_ADD_CONTACT : {
            return {
                ...state,
                err: action.err,
                contacts: [...state.contacts]
            }
        }
        case ACTION.DELETED_CONTACT_SUCCESS : {
            return {
                contacts: state.contacts.filter(item => item._id !== action.id)
            }
        }
        case ACTION.SEARCH_CONTACT_SUCCESS : {
            return {
                contacts: action.payload
            }
        }
        default:
            return state;
    }

}