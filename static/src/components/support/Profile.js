const PROFILE_QUERY = gql`
  query CurrentUserForLayout {
    currentUser {
      login
      avatar_url
    }
  }
`;

const Profile = () => (
  <Query query={PROFILE_QUERY} fetchPolicy="network-only">
    {({ client, loading, data: { currentUser } }) => {
      if (loading) {
        return <p className="navbar-text navbar-right">Loading...</p>;
      }
      if (currentUser) {
        return (
          <span>
            <p className="navbar-text navbar-right">
              {currentUser.login}
              &nbsp;
              <button
                onClick={() => {
                  // call your auth logout code then reset store
                  App.logout().then(() => client.resetStore());
                }}
              >
                Log out
              </button>
            </p>
          </span>
        );
      }
      return (
        <p className="navbar-text navbar-right">
          <a href="/login/github">Log in with GitHub</a>
        </p>
      );
    }}
  </Query>
);