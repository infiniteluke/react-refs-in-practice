const fs = require("fs-extra");
const { loremIpsum } = require("lorem-ipsum");

const posts = Array(30)
  .fill(true)
  .map((_, i) => ({
    id: i,
    text: loremIpsum({ count: 2 }),
    src: `https://source.unsplash.com/user/erondu/1000x700?${i}`,
  }));

const randomInitials = () =>
  String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
  String.fromCharCode(65 + Math.floor(Math.random() * 26));

const randomDate = () => {
  const start = new Date("2020-01-03");
  const end = new Date("2020-08-28");
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toLocaleDateString("en-US");
};

const comments = Array(40)
  .fill(true)
  .map((_, i) => ({
    id: i,
    author: randomInitials(),
    created: randomDate(),
    text: loremIpsum(),
    post: Math.round(Math.random() * (posts.length - 1)) + 1,
  }))
  .sort((a, b) => a.post - b.post);

fs.writeJson("./data.json", {
  comments,
  posts,
});
