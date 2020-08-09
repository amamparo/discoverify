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
  const response = await fetch(`${process.env.API_URL}${endpoint}?${qs.stringify(params)}`);
  if (response.status === 401) {
    return promptUserForAuthorization();
  }
  dispatch(receiveAction(await response.json()));
};