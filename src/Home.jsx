import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Slider,
  Table,
  Tooltip,
} from "antd";
import { useAllMovies } from "./AllQuery";
import { Rate } from "antd";
import { useCreateMovie, useCreateRating, useMovieSearch } from "./AllMutation";
import { useState } from "react";
const Home = () => {
  const [form] = Form.useForm();
  const [isAll, setIsAll] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const queryAllMovie = useAllMovies(user.id);
  const mutationRate = useCreateRating();
  const mutationCreateMovie = useCreateMovie();
  async function onFinish(value) {
    await mutationRate.mutateAsync({
      user_id: user.id,
      movie_id: value.movie,
      rating: value.slider,
    });
  }
  async function onFinish2(values) {
    values["release_date"] = values["release_date"].format("DD-MM-YYYY");
    mutationCreateMovie.mutateAsync(values).then(() => {
      form.resetFields();
    });
  }
  const mutatationSearch = useMovieSearch();
  function onChange(value, _, info) {
    _
    if (info.source=="clear") {
      setIsAll(true)
      queryAllMovie.refetch()
    }else{
      setIsAll(false)
      const search=String(value)
      if (search.length>2) {
        mutatationSearch.mutate(search);
      }
    }
    
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Released Date",
      dataIndex: "release_date",
      key: "release_date",
    },
    {
      title: "Average Rating",
      dataIndex: "average_rating",
      key: "average_rating",
      render: (text) => {
        return (
          <Tooltip title={text}>
            <Rate allowHalf value={text} disabled></Rate>
          </Tooltip>
        );
      },
    },
    {
      title: "Your Rating",
      dataIndex: "user_rating",
      key: "user_rating",
      render: (text, record) => {
        if (text == -1) {
          return (
            <div>
              <Form onFinish={onFinish}>
                <Form.Item name="slider">
                  <Slider min={0} max={5} step={0.1}></Slider>
                </Form.Item>
                <Form.Item
                  name="movie"
                  className="hidden"
                  initialValue={record.id}
                >
                  <Input></Input>
                </Form.Item>
                <div className="flex justify-center items-center -mt-6">
                  <Button
                    size="size"
                    className="bg-blue-500 text-white"
                    htmlType="submit"
                    loading={mutationRate.isPending}
                  >
                    Rate
                  </Button>
                </div>
              </Form>
            </div>
          );
        }
        return (
          <Tooltip title={text}>
            <Rate allowHalf value={text} disabled></Rate>
          </Tooltip>
        );
      },
    },
  ];
  
  return (
    <div>
      <Card>
        <Form
          layout="horizontal"
          onFinish={onFinish2}
          form={form}
          loading={mutationCreateMovie.isPending}
        >
          <Form.Item name="name" label="Name" required>
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Form.Item name="genre" label="Genre" required>
              <Input></Input>
            </Form.Item>
          </Form.Item>
          <Form.Item name="rating" label="Rating" required>
            <Select
              options={[
                { value: "G", label: "G" },
                { value: "PG", label: "PG" },
                { value: "PG-13", label: "PG-13" },
                { value: "NC-17", label: "NC-17" },
                { value: "X", label: "X" },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Form.Item name="release_date" label="Release Date" required>
              <DatePicker className="w-full" format="YYYY-MM-DD"></DatePicker>
            </Form.Item>
          </Form.Item>
          <div className="flex justify-center items-center -mt-6">
            <Button
              size="size"
              className="bg-blue-500 text-white font-semibold"
              htmlType="submit"
              loading={mutationCreateMovie.isPending}
            >
              Add
            </Button>
          </div>
        </Form>
      </Card>
      <Divider orientation="left"> All Movies </Divider>
      <div className="flex justify-center mt-2 mb-2">
        <Input.Search allowClear enterButton onSearch={onChange} size="large" placeholder="type to search..." loading={mutatationSearch.isPending}></Input.Search>
      </div>
      <Table
        bordered
        rowHoverable={false}
        columns={columns}
        dataSource={
          isAll
            ? queryAllMovie.data?.length != 0
              ? queryAllMovie.data
              : []
            : mutatationSearch.data?.length != 0
            ? mutatationSearch.data
            : []
        }
        loading={
          queryAllMovie.isLoading ||
          queryAllMovie.isRefetching ||
          queryAllMovie.isFetching || mutatationSearch.isPending
        }
        pagination={false}
        rowKey="id"
      ></Table>
    </div>
  );
};

export default Home;
