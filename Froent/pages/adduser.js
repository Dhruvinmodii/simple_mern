import React, { useState } from "react";
import axios from "axios";

const Adduser = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const { name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const body = JSON.stringify(newUser);
      const res = await axios.post(
        "/api/v2/bootcamp",
        body,
        config
      );

      console.log(res);

    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label for="fname">First name:</label>
      <br></br>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => onChange(e)}
      />
      <br></br>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Adduser;
