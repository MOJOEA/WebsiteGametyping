const form = document.getElementById("RegisterForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("/process/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const text = await res.text();
    errorMsg.innerText = text;
    errorMsg.style.color = text.includes("สำเร็จ") ? "green" : "red";

  } catch (err) {
    errorMsg.innerText = "เกิดข้อผิดพลาด!";
    errorMsg.style.color = "red";
    console.error(err);
  }
});

function togglePassword() {
  const passwordInput1 = document.getElementById("password_1");
  const passwordInput2 = document.getElementById("password_2");
  passwordInput1.type = passwordInput1.type === "password" ? "text" : "password";
  passwordInput2.type = passwordInput2.type === "password" ? "text" : "password";
}
