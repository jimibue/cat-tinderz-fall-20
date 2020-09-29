import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Header, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAxiosOnMount } from "../customHooks/useAxiosOnMount";

const Home = () => {
  // useState return an array => [getter, setter]

  const [
    { data: cats, loading, error, setData: setCats },
    refetch,
  ] = useAxiosOnMount({
    url: "/api/cats",
    type: "get",
  });

  const upVote = async (id) => {
    let res = axios.put(`/api/cats/${id}`);

    removeCatFromUI(id);
  };

  // this is UI ONLY
  const removeCatFromUI = (id) => {
    const filteredCats = cats.filter((cat) => cat.id !== id);
    setCats(filteredCats);
  };

  // const getCats = async () => {
  //   try {
  //     let res = await axios.get("/api/cats");
  //     console.log(res.data);
  //     setCats(res.data);
  //   } catch (err) {
  //     console.log(err.response);
  //     alert("error get cats");
  //   }
  // };

  // useEffect(() => {
  //   getCats();
  // }, []);

  const sample = () => {
    if (cats.length === 0) {
      return null;
    }
    // grabbing a random cat here and returning it
    const index = Math.floor(Math.random() * cats.length);
    return cats[index];
  };

  const renderCat = () => {
    const cat = sample();
    console.log(cat);
    if (cat) {
      return (
        <div>
          <br />
          <Header as="h1">Cat Tinder</Header>
          <br />
          <Card key={cat.id}>
            <Image src={cat.avatar} />
            <Card.Content>
              <Card.Header>
                {cat.name}-{cat.id}
              </Card.Header>
              <Card.Description>{cat.breed}</Card.Description>
              <Card.Meta>{cat.registry}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Button color="red" icon basic onClick={removeCatFromUI}>
                <Icon name="thumbs down" />
              </Button>
              <Button color="green" icon basic onClick={() => upVote(cat.id)}>
                <Icon name="thumbs up" />
              </Button>
            </Card.Content>
          </Card>
          <Link to="/my_cats">
            <Button color="blue">My Cats</Button>
          </Link>
        </div>
      );
    }
    return <Header> No More Cats</Header>;
  };

  return (
    <div>
      <h1>cats</h1>
      {renderCat()}
    </div>
  );
};

export default Home;
