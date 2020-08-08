import {Cookies} from 'react-cookie';
import {COOKIE_TOKEN_KEY} from './constants';
import qs from 'qs';
import promptUserForAuthorization from './components/Authorize/promptUserForAuthorization';

export default async ({
                        dispatch,
                        requestAction,
                        receiveAction,
                        endpoint,
                        params = {}
                      }) => {
  dispatch(requestAction());
  const response = await fetch(`${process.env.API_URL}${endpoint}?token=${new Cookies().get(COOKIE_TOKEN_KEY)}&${qs.stringify(params)}`);
  if (response.status === 401) {
    return promptUserForAuthorization();
  }
  dispatch(receiveAction(await response.json()));
};