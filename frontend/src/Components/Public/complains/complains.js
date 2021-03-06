import React, { useState, useEffect } from "react";
import Factory from "../../Cards/Factory/Factory";
import styles from "./complains.module.css";

import axios from "axios";
import web3 from "../../../ethereum/web3";
import Whistler from "../../../ethereum/whistler";
import Complain from "../../Cards/Complain/Complain";
import { Redirect } from "react-router-dom";
import Spinner from "../../../Ui/Spinner/Spinner";
import Header from "../../../Header/Header";
import Footer from "../../../Footer/Footer";
const Complains = () => {
  const [complains, setComplains] = useState([]);
  const [count, setCount] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);

    const accounts = await web3.eth.getAccounts();

    let complainArray = [];

    try {
      await axios
        .post("http://localhost:9001/factory/count")
        .then(async (res) => {
          setCount(res.data.count);
          console.log(res.data.count);
          console.log(res);

          for (let i = 1; i <= res.data.count; i++) {
            let c = await Whistler.methods.complaint_count(i).call({
              from: accounts[0],
            });

            console.log(c);

            for (let j = 0; j < c; j++) {
              let report = await Whistler.methods.complaints_map(i, j).call({
                from: accounts[0],
              });

              complainArray.push(report);

              console.log(report);
            }
          }

          setComplains(complainArray);

          setLoading(false);
        });

      // let count = await Whistler.methods.complaint_count(localStorage.getItem("ngoId")).call({
      //     from: accounts[0],
      //   });

      //   console.log(count);

      //   for(let i=0;i<count;i++){
      //     let complain = await Whistler.methods.complaints_map(localStorage.getItem("ngoId"), i).call({
      //                         from: accounts[0],
      //                     });

      //     complainArray.push(complain);
      //   }

      //   setComplains(complainArray);

      //   console.log(complains)

      //   setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      window.alert(e);
    }
  }, []);

  const complainsList = (
    <div>
      {complains.map((report) => (
        <Complain
          desc={report.description}
          hash={report.hash}
          phone={report.phone}
          date={report.date}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.pages}>
      {/* <Spinner/> */}

      {loading ? <Spinner /> : null}

      <Header />

      <div className={styles.box}>
        <div className={styles.bar}>
          <p>COMPLAINS</p>
        </div>
        {loading ? <Spinner /> : null}

        {complainsList}
      </div>
      <Footer />
    </div>
  );
};

export default Complains;
