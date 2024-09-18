//Vi du
import Sidebar from "../sidebar";
import './MainLayout.scss'

function AdminLayout (props) {
    return (
        <div class='layout-wrapper'>
            <Sidebar /> 
            <div class='content-body'>
                <props.component /> 
            </div>
        </div>
    )
}

export default AdminLayout;
