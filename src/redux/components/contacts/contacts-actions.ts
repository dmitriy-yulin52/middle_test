import {DispatchType} from "../../store";
import {
    ContactsSortType,
    ContactsType,
    NamesType,
    SetContacts, SetCurrentPage,
    SetIsError,
    SetIsLoading,
    SetMessageError, SetSortType
} from "./contacts-types";
import axios, {AxiosResponse} from "axios";
import {ResponseType} from "../../../api/contacts-api/contsacts-api";

function fetchContacts(): Promise<AxiosResponse<ResponseType>> {
    return axios.get<ResponseType>('https://randomuser.me/api/?results=50');
}

export const ContactsActions = {
    fetchContacts: fetchContactsThunk,
    setIsLoading: (isLoading: boolean): SetIsLoading => ({type: NamesType.SET_IS_LOADING, payload: isLoading}),
    setContacts: (contacts: ContactsType[]): SetContacts => ({type: NamesType.SET_CONTACTS, payload: contacts}),
    setIsError: (isError: boolean): SetIsError => ({type: NamesType.SET_IS_ERROR, payload: isError}),
    setMessageError: (messageError: string | null): SetMessageError => ({
        type: NamesType.SET_MESSAGE_ERROR,
        payload: messageError
    }),
    setSortType: (sortType: ContactsSortType): SetSortType => ({type: NamesType.SET_SORT_TYPE, payload: sortType}),
    setCurrentPage:(page:number):SetCurrentPage=>({type:NamesType.SET_CURRENT_PAGE,payload:page})
}

function fetchContactsThunk() {
    return async (dispatch: DispatchType) => {
        try {
            dispatch(ContactsActions.setIsLoading(true));
            const data = await fetchContacts().then((data) => data.data.results);
            dispatch(ContactsActions.setContacts(data));
            dispatch(ContactsActions.setIsLoading(false));
        } catch (e) {
            dispatch(ContactsActions.setIsError(true));
            dispatch(ContactsActions.setMessageError('Error'));
        }
    }
}