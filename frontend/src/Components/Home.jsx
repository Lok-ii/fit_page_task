import { Link } from "react-router-dom";
import { useStock } from "../StockContext/Context";
import { ShimmerTitle } from "react-shimmer-effects";

const Home = () => {
  const { data } = useStock();
  console.log(data);
  return (
    <div className="w-full h-full flex flex-col shadow-home rounded-lg">
      {data.length !== 0
        ? data.map((item, idx) => {
            return (
              <Link
                to={`/criteria/${item.id}`}
                key={item._id}
                className={`cursor-pointer hover:bg-[#F1F5F9] py-2 px-4 ${idx > 0 ? "border-t-[1px]" : ""} border-gray`}
              >
                <h1>{item.name}</h1>
                <p style={{ color: item.color }}>{item.tag}</p>
              </Link>
            );
          })
        : 
        (
          <div>
            <ShimmerTitle line={2} gap={10} variant="primary" />
            <ShimmerTitle line={2} gap={10} variant="primary" />
            <ShimmerTitle line={2} gap={10} variant="primary" />
            <ShimmerTitle line={2} gap={10} variant="primary" />
          </div>
        )
        }
    </div>
  );
};

export default Home;
