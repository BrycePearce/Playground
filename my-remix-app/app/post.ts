import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";

/*
 * A solid practice is to create a module that deals with a particular concern. In our case it's going to be reading and writing posts.
 */
export type Post = {
    slug: string;
    title: string;
};

export type PostMarkdownAttributes = {
    title: string;
};

// relative to the server output not the source!
const postsPath = path.join(__dirname, "..", "posts");

function isValidPostAttributes(
    attributes: any
): attributes is PostMarkdownAttributes {
    return attributes?.title;
}

export async function getPosts() {
    const dir = await fs.readdir(postsPath);
    return Promise.all(
        dir.map(async filename => {
            const file = await fs.readFile(
                path.join(postsPath, filename)
            );
            const { attributes } = parseFrontMatter(
                file.toString()
            );
            invariant(
                isValidPostAttributes(attributes),
                `${filename} has bad meta data!`
            );
            return {
                slug: filename.replace(/\.md$/, ""),
                title: attributes.title
            };
        })
    );
}

export async function getPost(slug: string) {
    const filepath = path.join(postsPath, slug + ".md");
    const file = await fs.readFile(filepath);
    const { attributes, body } = parseFrontMatter(file.toString());
    invariant(
        isValidPostAttributes(attributes),
        `Post ${filepath} is missing attributes`
    );
    const html = marked(body);

    return { slug, html, title: attributes.title };
}