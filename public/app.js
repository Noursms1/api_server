// تحديث حالة السيرفر
fetch("/api/status")
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").innerText =
      data.status + " - " + data.time;
  });

// زر التحميل
function download() {
  const url = document.getElementById("url").value;

  fetch("/api/download?url=" + encodeURIComponent(url))
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        JSON.stringify(data);
    });
}
