import styles from "../styles/Home.module.css";
import { DataStore, Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Post } from "../models";

export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
    // login();
    async function signUp() {
      try {
        const result = await Auth.signUp({
          username: "sergio",
          password: "12345678",
          attributes: {
            email: "sericmorales@gmail.com",
          },
        });
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    }

    // Auth.confirmSignUp("sergio", "279292");

    // async function login() {
    //   // await Auth.confirmSignUp("sergio", "279292");
    //   try {
    //     const result = await Auth.signIn({
    //       username: "sergio",
    //       password: "12345678",
    //       attributes: {
    //         email: "sericmorales@gmail.com",
    //       },
    //     });
    //     // await DataStore.save(
    //     //   new Post({
    //     //     title: "Lorem ipsum dolor sit amet",
    //     //     content: "Lorem ipsum dolor sit amet",
    //     //   })
    //     // );
    //     fetchPosts();
    //     console.log(result);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    async function fetchPosts() {
      const postData = await DataStore.query(Post);
      setPosts(postData);
    }
    DataStore.observe(Post).subscribe(() => fetchPosts());
  }, []);
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post, index) => (
        <Link href={`/posts/${post.id}`} key={index}>
          <a>
            <h2>{post.title}</h2>
          </a>
        </Link>
      ))}
    </div>
  );
}
