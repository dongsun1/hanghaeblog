function searchTitle() {
  const keyword = $("#searchBar").val();

  if (keyword === "") {
    alert("검색어를 입력해주세요.");
    return;
  }

  location.href = "/search/" + keyword;
}

function createPost() {
  const writer = $("#formWriter").val();
  const pw = $("#formPw").val();
  const title = $("#formTitle").val();
  const description = $("#formDesc").val();
  const date = moment().format("YYYY-MM-DD");

  if (writer === "") {
    alert("이름을 입력해주세요.");
    return;
  } else if (pw === "") {
    alert("비밀번호를 입력해주세요.");
    return;
  } else if (title === "") {
    alert("제목을 입력해주세요.");
    return;
  } else if (description === "") {
    alert("내용을 입력해주세요.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/api/post",
    data: {
      writer: writer,
      pw: pw,
      title: title,
      description: description,
      date: date,
    },
    success: function (response) {
      alert(response["msg"]);
      location.href = "/";
    },
  });
}

function updatePost(id) {
  const _id = id;
  const writer = $("#formWriter").val();
  const pw = $("#formPw").val();
  const title = $("#formTitle").val();
  const description = $("#formDesc").val();

  $.ajax({
    type: "PUT",
    url: "/api/update",
    data: {
      _id: _id,
      writer: writer,
      pw: pw,
      title: title,
      description: description,
    },
    success: function (response) {
      // location.href = "/";
      if (response["success"]) {
        alert(response["msg"]);
        location.href = "/detail/" + _id;
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function deletePost(id) {
  const _id = id;
  const pw = $("#formPw").val();

  $.ajax({
    type: "DELETE",
    url: "/api/delete",
    data: {
      _id: _id,
      pw: pw,
    },
    success: function (response) {
      if (response["success"]) {
        alert(response["msg"]);
        location.href = "/";
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function createComments(id) {
  const postId = id;
  const writer = $("#commentWriter").val();
  const pw = $("#commentPw").val();
  const description = $("#commentDesc").val();
  const date = moment().format("YYYY-MM-DD");

  if (writer === "") {
    alert("이름을 입력해주세요.");
    return;
  } else if (pw === "") {
    alert("비밀번호를 입력해주세요.");
    return;
  } else if (description === "") {
    alert("내용을 입력해주세요.");
    return;
  }

  $.ajax({
    type: "POST",
    url: "/api/commentPost",
    data: {
      postId: postId,
      writer: writer,
      pw: pw,
      description: description,
      date: date,
    },
    success: function (response) {
      if (response["success"]) {
        temp_html = `<hr />
        <div class="commentTop">
          <div class="commentWriter">${writer}님</div>
          <div class="commentDate">${date}</div>
        </div>
        <div class="commentBottom">
          <div class="commentDesc">${description}</div>
          <button class="btn btn-default commentDel" onclick="deleteComment('${response["comment"]._id}')">
            삭제
          </button>
        </div>
        `;
        $("#commentList").append(temp_html);

        $("#commentWriter").val("");
        $("#commentPw").val("");
        $("#commentDesc").val("");
      } else {
        alert(response["msg"]);
      }
    },
  });
}

function deleteComment(id) {
  const pw = prompt("비밀번호를 입력해주세요.");
  const _id = id;
  $.ajax({
    type: "DELETE",
    url: "/api/commentDelete",
    data: {
      _id: _id,
      pw: pw,
    },
    success: function (response) {
      if (response["success"]) {
        alert(response["msg"]);
        location.reload();
      } else {
        alert(response["msg"]);
      }
    },
  });
}
