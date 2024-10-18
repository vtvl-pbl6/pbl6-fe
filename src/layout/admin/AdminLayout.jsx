import Header from "../header/header";
import './AdminLayout.scss'

function AdminLayout(props) {
  return (
    <div class="layout-admin-wrapper">
      <Header />
      <div class="content-admin-body">
        <props.component />
      </div>
    </div>
  )
}

export default AdminLayout;