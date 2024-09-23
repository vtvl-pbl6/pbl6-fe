import Sidebar from "./Sidebar/sidebar";
import './UserLayout.scss'

function UserLayout (props) {
    return (
        <div class='layout-wrapper'>
            <Sidebar /> 
            <div class='content-body'>
                <props.component /> 
            </div>
        </div>
    )
}

export default UserLayout;
