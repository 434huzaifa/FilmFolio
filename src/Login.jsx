import { Button, Card, Form, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import "./wavy.css";
import { useConfirmUser } from "./AllMutation";
const Login = () => {
  const navigate = useNavigate();
  const mutationUser = useConfirmUser();
  async function onFinish(values) {
    await mutationUser.mutateAsync({
      email: values.email,
      password: values.password,
    });
    navigate("/");
  }
  return (
    <div className=" justify-center flex items-center min-h-screen bg-wavy">
      <Spin spinning={false}>
        <Card className="w-96 pb-12 pt-6 backdrop-blur-md bg-opacity-0 bg-white">
          <div>
            <p className="mb-5 text-center text-3xl font-roboto-slab text-black">
              <span className="text-purple-800">Welcome,</span> To FilmFolio
            </p>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="email"
                label="Email"
                className="font-bold"
                rules={[
                  { required: true },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input className="font-semibold font-roboto-slab"></Input>
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                className="font-bold"
                rules={[
                  { required: true },
                ]}
                validateTrigger="onBlur"
              >
                <Input.Password className="font-semibold font-roboto-slab"></Input.Password>
              </Form.Item>
              <div className="flex justify-center items-center flex-col">
                <Button
                  size="large"
                  htmlType="submit"
                  className="bg-orange-300 text-black font-semibold font-roboto-slab w-1/2"
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
