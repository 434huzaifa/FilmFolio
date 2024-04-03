import { Card, Divider, Table, Tooltip } from "antd";
import { useAllMovies } from "./AllQuery";
import { Rate } from 'antd';
const Home = () => {
  const queryAllMovie = useAllMovies();

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
        title:"Average Rating",
        dataIndex:"average_rating",
        key:"average_rating",
        render:(text)=>{
            return (
                <Tooltip title={text}>
                <Rate allowHalf value={text} disabled></Rate>
                </Tooltip>
            )
        }
    }
  ];
  function onRowClick(record) {
    console.log(record);
  }
  return (
    <div>
      <Card></Card>
      <Divider orientation="left"> All Movies </Divider>
      <Table
        bordered
        rowHoverable
        columns={columns}
        dataSource={queryAllMovie.data?.length != 0 ? queryAllMovie.data : []}
        loading={
          queryAllMovie.isLoading ||
          queryAllMovie.isRefetching ||
          queryAllMovie.isFetching
        }
        onRow={(record) => {
          return {
            onClick: ()=>{onRowClick(record)},
          };
        }}
        pagination={false}
        rowKey="id"
        rootClassName="hover:cursor-pointer"
      ></Table>

    </div>
  );
};

export default Home;
