console.log("CLIENT JS")
//SCRAPE FUNCTION WITH NO REDUNDANCY PREVENTION WORKING LOCALLY
//  $.ajax({
//         method: "GET",
//         url: "/scrape/"
//       })
        // .then(function(data) {
        //   console.log(data);
        // });

$("#scrapeBtn").on("click" , function(element) {
    console.log("CLICKED");
})

$.ajax({
        method: "GET",
        url: "/articles/"
      }).then(function(data) {
          console.log(data);
          data.forEach(function(element) {
              tablePop(element);
          });
          $(".addNote").on("click" , function(event) {
            $("#noteForm").empty()
            let eventAttr = $(this).attr("dbid")
            console.log("NOTECLICK")
            let formDiv = $("<div>")
            formDiv.addClass("form-group")
            let noteTitle = $("<input>")
            let titleLabel = $("<label>")
            titleLabel.attr("for" , "currentTitleInput" )
            titleLabel.text("Title Your Note")
            noteTitle.attr("type" , "text")
            noteTitle.addClass("form-control")
            noteTitle.attr("id" , "currentTitleInput")
            let noteBody = $("<input>")
            let bodyLabel = $("<label>")
            bodyLabel.text("Add Comment Text Below")
            bodyLabel.attr("for" , "currentBodyInput")
            noteBody.attr("type" , "text")
            noteBody.addClass("form-control")
            noteBody.attr("id" , "currentBodyInput")
            let formButton = $("<button>")
            formButton.attr("type" , "submit")
            formButton.addClass("btn btn-primary")
            formButton.attr("id" , "currentFormButton")
            formButton.text("Submit Note")
            formDiv.append(titleLabel)
            formDiv.append(noteTitle)
            formDiv.append(bodyLabel)
            formDiv.append(noteBody)
            formDiv.append(formButton)
            console.log(formDiv)
            var noteForm = $("#noteForm")
            $("#noteForm").append(formDiv)
            $("#currentFormButton").on("click" , function(event) {
                event.preventDefault()
                console.log("postclick")
                let noteTitle = $("#currentTitleInput").val().trim()
                let noteBody = $("#currentBodyInput").val().trim()
                console.log(noteTitle , noteBody)
                $.ajax({
                    method: "POST",
                    url: `/articles/${eventAttr}`,
                    data: {
                        title: noteTitle,
                        body: noteBody
                    }
                }).then(function(note) {
                    console.log(`Note added to article ${note}` , note)
                })
            })
            console.log(noteForm)
            
        })
        $(".getNote").on("click" , function(event) {
            console.log("clicked")
            let getAttr = $(this).attr("dbid")
            $.ajax({
                method: "GET",
                url: `/articles/${getAttr}`
            }).then(function(data) {
                console.log(data);
                var commentID = data.comment
                console.log(commentID)
                $.ajax({
                    method: "GET",
                    url: `/comments/${commentID}`
                }).then(function(comments) {
                    console.log(comments)
                })
            });
        });
    });

const tablePop = db => {
    let valTitle = db.title;
    let valDescription = db.link;
    let dbID = db._id;
    let noteBtnAdd = $("<button>");
    let noteBtnGet = $("<button>")

    noteBtnAdd.attr("dbid" , dbID);
    let noteAttr = noteBtnAdd.attr("dbid")
    console.log(noteAttr)
    // noteBtnAdd.attr("id" , noteAttr)
    noteBtnAdd.text("Add Note");
    noteBtnAdd.addClass("btn btn-primary addNote");

    noteBtnGet.attr("dbid" , dbID);
    console.log(noteAttr)
    // noteBtnGet.attr("id" , noteAttr)
    noteBtnGet.text("Get Notes");
    noteBtnGet.addClass("btn btn-dark getNote");

    var dataArray = [valTitle , valDescription , noteBtnAdd , noteBtnGet];

    var bodyRow = $("<tr>");
    dataArray.forEach(function(element) {
        var newData = $("<td>");
        newData.html(element);
        bodyRow.append(newData);
    });
    $('#articleTable').append(bodyRow);
}
