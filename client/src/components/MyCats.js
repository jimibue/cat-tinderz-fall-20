import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Divider, Image } from "semantic-ui-react";

const MyCats = () => {
  const [cats, setCats] = useState([]);

  async function getLikedCats() {
    try {
      let res = await Axios.get("/api/my_cats");
      console.log(res);
      setCats(res.data);
    } catch (err) {
      console.log(err.response);
    }
  }

  useEffect(() => {
    getLikedCats();
  }, []);

  return (
    <Card.Group itemsPerRow={4}>
      {cats.map((cat) => (
        <Card key={cat.id}>
          <Image src={cat.avatar} />
          <Card.Content>
            <Divider />
            <Card.Header>{cat.name}</Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default MyCats;
