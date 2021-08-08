function clearErrors() {
  let errorBox = document.getElementById("error-box")
  errorBox.innerHTML = ""
}

function showCoursePrompt() {
  clearErrors()
  let canvasLoginDiv = document.getElementById("canvas-login")
  let getCourseListDiv = document.getElementById("get-course-list")
  canvasLoginDiv.classList.toggle("hidden")
  getCourseListDiv.classList.toggle("hidden")
}

function undoShowCoursePrompt() {
  showCoursePrompt()
}

function copyToClipboard(link, course) {
  let input = document.createElement("input")
  input.value = link
  input.style = "position: absolute; left: -1000px; top: -1000px";
  document.body.appendChild(input)
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  alert("Copied link for " + course + " to clipboard:\n" + link)
}

function showCourseLinks() {
  clearErrors()
  let errorBox = document.getElementById("error-box")
  try {
    let courses = JSON.parse(document.getElementById("paste-box").value)
    if (courses.length == 0) {
      errorBox.innerHTML = "It doesn't look like you have any courses; is that right? Feel free to try again!"
    } else {
      let getCourseListDiv = document.getElementById("get-course-list")
      let courseListLinksDiv = document.getElementById("course-list-links")
      getCourseListDiv.classList.toggle("hidden")
      courseListLinksDiv.classList.toggle("hidden")

      let table = document.getElementById("course-table")
      let anyError = false
      for (let i = 0; i < courses.length; i++) {
        let course = courses[i]
        row = table.insertRow(-1)
        nameCell = row.insertCell(0)
        linkCell = row.insertCell(1)
        copyCell = row.insertCell(2)
        nameCell.classList.add("name-col")
        linkCell.classList.add("link-col")
        copyCell.classList.add("copy-col")
        nameCell.classList.add("generated")
        linkCell.classList.add("generated")
        copyCell.classList.add("generated")
        let courseName = "Unknown"
        if ("name" in course) {
          courseName = course.name
        } else {
          anyError = true
        }
        nameCell.innerHTML = courseName
        if (("calendar" in course) && ("ics" in course.calendar)) {
          linkCell.innerHTML = "<a href=\"" + course.calendar.ics + "\">" + course.calendar.ics + "</a>"
          copyCell.innerHTML = "<button onclick=\"copyToClipboard('" + course.calendar.ics + "', '" + courseName + "')\">Copy Link</button>"
        } else {
          linkCell.innerHTML = "Unknown"
          anyError = true
        }
      }
      if (anyError) {
        errorBox.innerHTML = "It looks like there were some issues finding your calendar links. If you want help, feel free to submit a bug report via a GitHub Issue!"
      }
    }
  } catch (error) {
    console.log(error)
    errorBox.innerHTML= "The pasted text doesn't look right, could you try clearing the text box and copying and pasting again?"
  }
}

function undoShowCourseLinks() {
  clearErrors()
  let pasteBox = document.getElementById("paste-box")
  pasteBox.value = ""
  const cells = document.getElementsByClassName("generated");
  while(cells.length > 0){
    cells[0].parentNode.removeChild(cells[0]);
  }
  let getCourseListDiv = document.getElementById("get-course-list")
  let courseListLinksDiv = document.getElementById("course-list-links")
  getCourseListDiv.classList.toggle("hidden")
  courseListLinksDiv.classList.toggle("hidden")
}