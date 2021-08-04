const Profile = ({ account }) => {
    return (
        <div className="container mt-4 text-center">
            <h2>{Capitalize(account.username)}'s Profile</h2>
            <div>
                <p><b>bio:</b> <i>{account.bio}</i></p>
            </div>
        </div>
    );
}

export default Profile;

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}