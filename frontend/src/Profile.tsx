import { RouteComponentProps } from 'react-router-dom';

const Profile = ({ match }: RouteComponentProps<{ username: string }>) => {
  return (
    <div>
      <h1>Hello {match.params.username}</h1>
    </div>
  );
};

export default Profile;
