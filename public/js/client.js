console.log("CLIENT JS")
//SCRAPE FUNCTION WITH NO REDUNDANCY PREVENTION WORKING LOCALLY
//TODO WRAP IN FUNCTION WHEN BUTTONS WORK
 $.ajax({
        method: "GET",
        url: "/scrape/"
      })
        .then(function(data) {
          console.log(data);
        });

//TODO FIX HANDLEBARS BUTTON ISSUES
$("#scrapeBtn").on("click" , function(element) {
    console.log("CLICKED");
})

//TODO WRAP IN FUNCTION WHEN BUTTONS WORK
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
            $("#noteForm").empty()
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
                    notePop(comments)
                })
            });
        });
    });

//DYNAMICALLY POPULATE SCRAPED ARTICLES
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

//DYNAMICALLY POPULATE SELECTED ARTICLE COMMENTS
const notePop = db => {
    const headArray = ["Title" , "Comment"]
    let comTitle = db.title
    let comBody = db.body
    const comArray = [comTitle , comBody]

    let commentTable = $("<table>")
    commentTable.addClass("table")
    let commentThead = $("<thead>")
    let headTr = $("<tr>")
    headArray.forEach(function(element) {
        let headTh = $("<th>")
        headTh.attr("scope" , "col")
        headTh.text(element)
        headTr.append(headTh)
    })
    let commentTbody = $("<tbody>")
    let bodyTr = $("<tr>")
    comArray.forEach(function(element){
        let bodyTd = $("<td>")
        bodyTd.text(element)
        bodyTr.append(bodyTd)
    })
    commentThead.append(headTr)
    commentTbody.append(bodyTr)
    commentTable.append(commentThead)
    commentTable.append(commentTbody)
    $("#noteForm").append(commentTable)
}
