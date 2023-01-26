import useSWR from 'swr';
import { fetcher } from './fetcher';
import Cookies from 'js-cookie';

export const useAppCatalog =  ()=>{
    const token = Cookies.get('session');
    const { data, error, isLoading } = useSWR([`https://infinite-reaches-06342.herokuapp.com/api/appcatalog`,token], fetcher)
    return {
      appData: data,
      isLoading,
      isError: error
    }
  }
