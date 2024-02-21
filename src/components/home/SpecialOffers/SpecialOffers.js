import React, { useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const SpecialOffers = () => {
  const user = useSelector((state) => state.auth.user);

  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  console.log({ books });

  const fetchData = () => {
    let cancel;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_PRODUCT_BASE_URL}/recommend/items?page=${pageNumber}`,
      params: { page: pageNumber },
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [
            ...new Set([
              ...prevBooks,
              ...res?.data?.data?.products.map((b) => b),
            ]),
          ];
        });
        setHasMore(res?.data?.products.length > 0);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
  };

  return (
    <div className="w-full pb-20 overflow-hidden">
      <Heading heading="For You" />
      <InfiniteScroll
        dataLength={books.length}
        next={fetchData}
        hasMore={true} // Replace with a condition based on your data source
        loader={
          <Box>
            <CircularProgress />
          </Box>
        }
        style={{ overflowY: "hidden" }}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10 overflow-y-hidden">
          {books.map((book, index) => {
            return (
              <div key={book.code}>
                <Product
                  _id={book.code}
                  img={book?.images[0]?.url}
                  productName={book.name}
                  price={`${book.price_currency} ${book.price}`}
                  color={book.shortDescription}
                  badge={true}
                  des={book.shortDescription}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default SpecialOffers;
