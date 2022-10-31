import { Socket } from "phoenix";

let socket = new Socket("/socket", { params: { token: window.userToken } });

socket.connect();

window.createSocket = (topicID) => {
  let channel = socket.channel(`comment:${topicID}`, {});
  channel
    .join()
    .receive("ok", (resp) => {
      console.log(resp);
      renderComments(resp.comments);
    })
    .receive("error", (resp) => {
      console.log("Unable to join", resp);
    });

  channel.on(`comments:${topicID}:new`, renderComment);

  document.querySelector("button").addEventListener("click", function () {
    const content = document.querySelector("textarea").value;
    channel.push("comment:add", { content });
  });
};

function renderComments(comments) {
  const renderedComments = comments.map((comment) => {
    return commentTemplate(comment);
  });

  document.querySelector(".collection").innerHTML = renderedComments.join("");
}

function renderComment(event) {
  const renderedComment = commentTemplate(event.comment);

  document.querySelector(".collection").innerHTML += renderedComment;
}

function commentTemplate(comment) {
  const email = comment.user === null ? "Anonymous" : comment.user.email;
  return `
  <li class="collection-item">
  ${comment.content}
  <div class="secondary-content">
  ${email}
  </div>
  </li>
  `;
}

// export default socket;
