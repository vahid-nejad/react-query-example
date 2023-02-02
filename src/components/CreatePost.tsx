import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Button } from "./elements";
import { PostQueryKey } from "../customHooks/queries";

interface Props {
  userId: number;
}

const sendUserPost = async (userId: number, title: string, body: string) => {
  const res = await fetch("http://localhost:8000/test/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      user: { id: userId },
      title: title,
      body: body,
    }),
  });
  return await res.json();
};
const CreatePost = (props: Props) => {
  const queryClient = useQueryClient();
  const title = useRef("");
  const body = useRef("");
  const mutation = useMutation({
    mutationFn: () => sendUserPost(props.userId, title.current, body.current),

    onSuccess: () => {
      queryClient.invalidateQueries([PostQueryKey, props.userId]);
    },
  });

  const add = () => mutation.mutate();
  return (
    <div className="border rounded shadow p-2 grid grid-cols-6 gap-2">
      <label className="block" htmlFor="title">
        Title
      </label>
      <input
        onChange={(e) => (title.current = e.target.value)}
        className="border  col-span-5"
        type="text"
        id="title"
      />

      <label className="block">body</label>
      <textarea
        onChange={(e) => (body.current = e.target.value)}
        className="border col-span-5"
        name="body"
        id="body"
      ></textarea>
      <Button onClick={add}>Add Post</Button>
    </div>
  );
};

export default CreatePost;
