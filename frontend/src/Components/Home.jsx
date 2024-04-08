import { Link } from "react-router-dom";
import { useStock } from "../StockContext/Context";

const Home = () => {
  const { data } = useStock();
  console.log(data);
  return (
    <div className="flex flex-col gap-2 shadow-home rounded-lg">
      {data
        ? data.map((item) => {
            return (
              <Link
                to={`/criteria/${item.id}`}
                key={item._id}
                className="cursor-pointer hover:bg-[#5552B6] py-2 px-4"
              >
                <h1>{item.name}</h1>
                <p style={{ color: item.color }}>{item.tag}</p>
              </Link>
            );
          })
        : "Loading..."}
    </div>
  );
};

export default Home;
