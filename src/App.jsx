import { ToastContainer } from "react-toastify";
import MainRouter from "./router";
import { AuthProvider } from "./store/auth.context";
import { PageTitleProvider } from "./store/page-title.context";

function App() {
  return (
    <>
      <AuthProvider>
        <PageTitleProvider>
          <MainRouter />
        </PageTitleProvider>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
