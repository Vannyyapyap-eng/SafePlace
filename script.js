/* =========================
   NAVIGATION MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});


/* =========================
   HORIZONTAL SLIDER
========================= */

const slider = document.getElementById("slider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {
    slider.scrollBy({
        left: 320,
        behavior: "smooth"
    });
});

prevBtn.addEventListener("click", () => {
    slider.scrollBy({
        left: -320,
        behavior: "smooth"
    });
});


/* =========================
   QUIZ DATA
========================= */

const questions = [
    {
        question: "Apa yang dimaksud dengan keamanan digital?",
        answers: [
            "Melindungi data dan informasi di dunia digital",
            "Membuat akun media sosial",
            "Menggunakan internet sepanjang hari",
            "Membagikan semua informasi pribadi"
        ],
        correct: 0
    },
    {
        question: "Manakah contoh password yang lebih kuat?",
        answers: [
            "123456",
            "password",
            "Nama sendiri",
            "Kombinasi panjang huruf, angka, dan simbol"
        ],
        correct: 3
    },
    {
        question: "Apa tujuan utama dari phishing?",
        answers: [
            "Meningkatkan kecepatan internet",
            "Mencuri informasi sensitif seseorang",
            "Memperbaiki perangkat",
            "Melindungi akun pengguna"
        ],
        correct: 1
    },
    {
        question: "Apa yang harus dilakukan sebelum membagikan berita?",
        answers: [
            "Langsung membagikannya",
            "Memercayai semua sumber",
            "Memeriksa kebenaran informasi",
            "Mengubah isi berita"
        ],
        correct: 2
    },
    {
        question: "Mengapa kita perlu menjaga privasi digital?",
        answers: [
            "Agar semua orang mengetahui data kita",
            "Untuk mengurangi risiko penyalahgunaan data pribadi",
            "Agar akun mudah diakses orang lain",
            "Supaya bisa membagikan password"
        ],
        correct: 1
    }
];


/* =========================
   QUIZ SYSTEM
========================= */

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const scoreDisplay = document.getElementById("scoreDisplay");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextQuestionBtn = document.getElementById("nextQuestion");
const progress = document.getElementById("progress");
const quizResult = document.getElementById("quizResult");

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;

    scoreDisplay.textContent = `Skor: ${score}`;

    questionText.textContent = q.question;

    progress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    answersContainer.innerHTML = "";

    feedback.textContent = "";

    nextQuestionBtn.disabled = true;
    nextQuestionBtn.textContent = "Pertanyaan Selanjutnya →";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersContainer.appendChild(button);
    });
}


function checkAnswer(selected, selectedButton) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;

    const allButtons =
        answersContainer.querySelectorAll(".answer-btn");

    allButtons.forEach((button, index) => {

        button.disabled = true;

        if (index === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selected === correctAnswer) {

        score += 20;

        feedback.textContent = "✓ Benar! Jawaban kamu tepat.";
        feedback.style.color = "#249b54";

    } else {

        selectedButton.classList.add("wrong");

        feedback.textContent =
            "✗ Belum tepat. Perhatikan jawaban yang benar berwarna hijau.";

        feedback.style.color = "#d84b4b";
    }

    scoreDisplay.textContent = `Skor: ${score}`;

    nextQuestionBtn.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextQuestionBtn.textContent = "Lihat Hasil Kuis";
    }
}


nextQuestionBtn.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();
    }
});


function showResult() {

    questionText.style.display = "none";
    answersContainer.style.display = "none";
    feedback.style.display = "none";
    nextQuestionBtn.style.display = "none";

    quizResult.hidden = false;

    let message = "";

    if (score === 100) {
        message = "Luar biasa! Kamu sangat memahami keamanan digital.";
    } else if (score >= 60) {
        message = "Bagus! Pengetahuanmu sudah cukup baik.";
    } else {
        message = "Tetap semangat! Pelajari kembali materi SafeNet.";
    }

    quizResult.innerHTML = `
        <h2>🎉 Kuis Selesai!</h2>
        <h3>Nilai Kamu: ${score}/100</h3>
        <p>${message}</p>
        <button class="btn-primary" id="restartQuiz">
            Ulangi Kuis ↻
        </button>
    `;

    document.getElementById("restartQuiz")
        .addEventListener("click", restartQuiz);
}


function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    questionText.style.display = "";
    answersContainer.style.display = "";
    feedback.style.display = "";
    nextQuestionBtn.style.display = "";

    quizResult.hidden = true;

    showQuestion();
}

showQuestion();


/* =========================
   THANK YOU BUTTON
========================= */

const thankButton = document.getElementById("thankButton");
const thankMessage = document.getElementById("thankMessage");

thankButton.addEventListener("click", () => {

    thankMessage.textContent =
        "💙 Terima kasih sudah berkunjung! Sampai jumpa kembali di SafeNet.";

    thankButton.textContent = "Terima Kasih!";

    thankButton.disabled = true;
});


/* =========================
   RESPONSE FORM - EMAIL
========================= */

const responseForm = document.getElementById("responseForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");

responseForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    // Periksa kolom anti-spam
    if (responseForm.elements["_honey"].value !== "") {
        return;
    }

    const formData = new FormData(responseForm);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        topic: formData.get("topic"),
        message: formData.get("message"),
        _subject: "Respons Pengunjung Website SafeNet",
        _template: "table"
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Mengirim...";

    formStatus.textContent = "Sedang mengirim respons...";
    formStatus.style.color = "#176bdb";

    try {

        const response = await fetch(
            "https://formsubmit.co/ajax/pluviophilefoxglove@gmail.com",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();

        if (!response.ok || result.success !== "true") {
            throw new Error("Pengiriman belum berhasil.");
        }

        formStatus.textContent =
            "✓ Terima kasih! Respons berhasil dikirim.";

        formStatus.style.color = "#249b54";

        responseForm.reset();

    } catch (error) {

        formStatus.textContent =
            "Pengiriman gagal. Silakan coba kembali beberapa saat lagi.";

        formStatus.style.color = "#d84b4b";

    } finally {

        submitBtn.disabled = false;
        submitBtn.textContent = "Kirim Respons →";
    }

});
