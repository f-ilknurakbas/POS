import Header from "../components/header/Header.jsx";
import { useEffect,useState } from "react";
import StatisticCard from "../components/statistics/StatisticCard.jsx";

const StatisticPage = () => {

  const [customerCount, setCustomerCount] = useState();
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SEVER_URL+"/api/bills/get-all");
        const data = await res.json();
        console.log(data)
        setCustomerCount(data.length)

        let totalAmountSum = 0;
        data.forEach(item => {
          totalAmountSum += item.totalAmount;
        });
        setTotalAmount(totalAmountSum);
      } catch (error) {
        console.log(error);
      }
    };
  
    getBills();
  }, []);
  
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{" "}
            <span className="text-green-700 font-bold text-xl">admin</span>.
          </h2>
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={customerCount}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={`${totalAmount} ₺`}
              img={"images/money.png"}
            />
            
            
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;