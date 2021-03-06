import * as React from 'react';
import {FC, ReactElement, useEffect} from 'react';
import {useAction} from "../utils/hooks/hooks-utils";
import {useTypedSelector} from "../utils/hooks/useTypedSelector";
import {ContactsFilters} from "../components/ui/contacts-filters/ContactsFilters";
import {ContactsActions} from "../redux/components/contacts/contacts-actions";
import {ContactsView} from "../components/ui/contacts-view/ContactsView";
import {Box} from "@mui/material";
import {Statistic} from "../components/ui/statistic/Statistic";
import {Pagination} from "../components/ui/pagination/Pagination";



export const Home:FC = ():ReactElement => {

    const {view} = useTypedSelector(state => state.contactsView);
    const {isLoading} = useTypedSelector(state => state.contacts);
    const fetchContactsHandler = useAction(ContactsActions.fetchContacts)

    useEffect(()=>{
        fetchContactsHandler()
    },[])


    return (
        <Box margin={'16px'}>
            <ContactsFilters/>
            <ContactsView view={view} isLoading={isLoading}/>
            <Statistic/>
            <Pagination/>
        </Box>
    );
};