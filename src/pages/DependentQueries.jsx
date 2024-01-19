import axios from 'axios';
import { useQuery } from 'react-query';

/**
 *
 * Dependent Queries:
 * - We need to execute a query one after another and the situation
 *   arises when you have one query dependent on the results of
 *   another query, let's see how address this
 *
 * - The Requirements are:
 *   In Dependent Queries page we need to fetch the list of
 *   courses for the email ahmed@gmail.com, now this would
 *   require two steps first we query for the user whose email
 *   is  ahmed@gmail.com then using the channelId associated
 *   with the user we need to fire a second query and fetch
 *   the channel details where the id matches the user's
 *   channelId since we can't fetch the channel details till
 *   we fetch the user details this is an example of dependent
 *   queries, it is a pretty common example in large scale
 *   applications, let's learn how to do this with query.
 *
 * - For Step#1
 *   - We need to fetch the user using the email prop and get the channelId .
 * - For Step#2:
 *   - We use the channelId to fetch the channel courses let's begin.
 */

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQueries = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email)
  );

  const channelId = user?.data?.channelId;
  // Now this query will be fired as soon as the component mounts
  // and the channel id would be equal to undefined however we want
  // the query to be fired only after the channel id has been
  // retrieved and for that we go back to the enabled property
  // we have learned in previous lectures so as the third argument
  // we specify our config object and we set enable to double
  // negation channelId, double negation converts the value to a
  // boolean which is what the enabled property expects, so all we
  // are saying is only after the channelId has been retrieved
  // fetch the channelDetails

  const { data: userChannelDetails } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  return <div>DependentQueries</div>;
};

export default DependentQueries;
