import Header from "../header/header";
import "./AdminLayout.scss";

function AdminLayout(props) {
  return (
    <div class="layout-wrapper">
      <Header />
      <div class="content-body">
        <props.component />
      </div>
    </div>
  );
}

export default AdminLayout;
