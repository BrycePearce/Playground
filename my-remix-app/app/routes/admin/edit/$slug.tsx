import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useLoaderData,
  useSubmit,
} from "remix";
import invariant from "tiny-invariant";
import { createPost, getPost } from "~/post";
import { useState, useEffect } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  console.log(title, slug, markdown);

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function EditSlug() {
  const post = useLoaderData();
  const [textarea, setTextarea] = useState(post.html);
  const submit = useSubmit();

  useEffect(() => {
    setTextarea(post.html);
  }, [post]);

  const handleSubmit = (event: any) => {
    submit(
      { target: event?.currentTarget, someData: "goesHere" },
      { method: "post", action: "/admin/edit/test" }
    );
  };

  return (
    <>
      <Link to="/admin">Back to Admin</Link>
      <Form method="post" onSubmit={handleSubmit}>
        <p>
          <label>
            Post Title:
            <input type="text" name="title" value={post.title} readOnly />
          </label>
        </p>
        <p>
          <label>
            Post Slug:
            <input type="text" name="slug" value={post.slug} readOnly />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">Markdown:</label> <br />
          <textarea
            id="markdown"
            rows={20}
            cols={100}
            name="markdown"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
          />
        </p>
        <p>
          <button type="submit">Edit Post</button>
        </p>
      </Form>
      <div dangerouslySetInnerHTML={{ __html: textarea }} />
    </>
  );
}
