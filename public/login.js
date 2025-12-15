const form = document.getElementById("LoginForm");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch("/process/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        });

        const text = await res.text();
        errorMsg.innerText = text;
        errorMsg.style.color = text.includes("success") ? "green" : "red";

    } catch (err) {
        errorMsg.innerText = "เกิดข้อผิดพลาด!";
        errorMsg.style.color = "red";
        console.error(err);
    }
});

function togglePassword() {
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
