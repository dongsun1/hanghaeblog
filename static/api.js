function createPost() {
  const title = $("#formTitle").val();
  const description = $("#formDesc").val();

  const date = moment().format("YYYY-MM-DD");
  $.ajax({
    type: "POST",
    url: "/api/post",
    data: { title: title, description: description, date: date },
    success: function (response) {
      location.href = "/";
    },
  });
}

function updatePost() {
  const title = $("#formTitle").val();
  const description = $("#formDesc").val();

  const date = moment().format("YYYY-MM-DD");
  $.ajax({
    type: "POST",
    url: "/api/update",
    data: { title: title, description: description, date: date },
    success: function (response) {
      location.href = "/";
    },
  });
}
