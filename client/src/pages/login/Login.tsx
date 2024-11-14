import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@/components";
import { useDocumentTitle } from "@/hooks";
import { AuthService } from "@/apollo/services";
import { useLoginMutation } from "@/apollo/generated/types";

const Login = () => {
  useDocumentTitle("Login");

  const [login, { loading, error }] = useLoginMutation();

  const navigate = useNavigate();

  const onButtonClick = async () => {
    await login({
      variables: {
        username: "belk1ng",
        password: "password",
      },
      onCompleted(data) {
        AuthService.signIn({
          accessToken: data.login.accessToken,
          refreshToken: data.login.refreshToken,
        });

        navigate("/home");
      },
    });
  };

  return (
    <section>
      <Typography variant={"heading-1"}>Login</Typography>
      <Button onClick={onButtonClick}>
        {loading ? "Loading..." : "Login"}
      </Button>
      {error && <Typography variant={"body-large"}>{error.message}</Typography>}
    </section>
  );
};

export default Login;
