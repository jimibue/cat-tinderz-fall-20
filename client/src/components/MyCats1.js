import React, { useState, useEffect } from "react";
import { Button, Card, Divider, Image } from "semantic-ui-react";
import { useAxiosOnMount } from "../customHooks/useAxiosOnMount";

const MyCats = () => {
  const [{ data: cats, loading, error }, refetch] = useAxiosOnMount({
    url: "/api/my_cats",
    type: "get",
  });

  return (
    <div style={{ marginTop: "20px" }}>
      <Button onClick={refetch}>re get</Button>
      <Card.Group itemsPerRow={4}>
        {loading && <p>spinner</p>}
        {error ? (
          <p>error occurred</p>
        ) : (
          cats.map((cat) => (
            <Card key={cat.id}>
              <Image src={cat.avatar} />
              <Card.Content>
                <Divider />
                <Card.Header>{cat.name}</Card.Header>
              </Card.Content>
            </Card>
          ))
        )}
      </Card.Group>
    </div>
  );
};

export default MyCats;
