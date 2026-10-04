/* ---------- Data ---------- */
const skillSets = {
    course: [
        { name: "C",          img: "icons/c.png" },
        { name: "C++",        img: "icons/c++.png" },
        { name: "Java",       img: "icons/java.webp" },
        { name: "HTML",       img: "icons/html.png" },
        { name: "CSS",        img: "icons/css.png" },
        { name: "JavaScript", img: "icons/js.webp" },
        { name: "SQL",        img: "icons/sql.png" }
    ],
    general: [
        { name: "Communication",     img: "icons/comms.png" },
        { name: "Teamwork",          img: "icons/teamwork.png" },
        { name: "Management",        img: "icons/planning.png" },
        { name: "Software Literacy", img: "icons/comp.png" }
    ],
    education: [
        { name: "Jose Rizal Memorial School",       year: "(2012 - 2019)",    img: "icons/jrms.png", desc: "I began my education at this institution, where I built a foundation in reading, writing, science, and mathematics, formed my first friendships, and developed a curiosity about computers and technology under the guidance of dedicated educators." },
        { name: "Calamba City School for the Arts", year: "(2019 - 2023)",    img: "icons/ccsa.png", desc: "I completed my junior high school at this campus, a school for the arts that also maintains a strong academic reputation. Here, my singing talent flourished and my academic abilities were refined, particularly in science and research, thanks to the guidance of exceptional teachers and valuable practical experiences." },
        { name: "STI College Calamba",              year: "(2023 - 2025)",    img: "icons/sti.png",  desc: "Apart from my interest in technology, there was also a part of me that was also invested in the ways of the kitchen. Here is where I finished my senior high school education in the strand of Culinary Arts, and where I learned to collaborate with other people efficiently, and experience the working field due to work immersion. Making the most out of my remaining 2 years of secondary education." },
        { name: "City College of Calamba",          year: "(2025 - Present)", img: "icons/ccc.png",  desc: "The university I am currently attending, and where I am pursuing a Bachelor of Science in Computer Science, which has allowed me to fully engage my long-standing interest in technology. Although the path has been demanding, I continue to gain new and practical knowledge each day through both lectures and hands-on activities." }
    ]
};

const hobbies = [
    {
        name: "Gaming",
        desc: "I enjoy a wide variety of video games, from open-world exploration, combat, and creature-catching, and it's always nice if it can be played with friends. Here are some of the games I play:",
        media: [
            { name: "Genshin Impact", img: "icons/genshin.jpg" },
            { name: "Minecraft",      img: "icons/minecraft.jpg" },
            { name: "Valorant",       img: "icons/valorant.jpg" },
            { name: "Pokémon",        img: "icons/pokemon.webp" }
        ]
    },
    {
        name: "Watching Shows/Movies",
        desc: "Sometimes, after a long day, I like to sit down, enjoy, and immerse myself in the world of a series or a movie, no matter the genre. Here are some I enjoyed watching:",
        media: [
            { name: "Arcane",          img: "icons/arcane.webp" },
            { name: "Attack on Titan", img: "icons/aot.jpg" },
            { name: "The Office",      img: "icons/theoffice.jpg" },
            { name: "Superman",        img: "icons/superman.webp" }
        ]
    },
    {
        name: "Cooking",
        desc: "I still like to exercise my former field of study from time to time. Experimenting with different flavors and dishes will always be exciting. Here are some dishes I made:",
        media: [   // placeholders: replace with your own dishes
            { name: "Braised Pork Tenderloin",          img: "icons/braisedpork.jpg" },
            { name: "Pistachio Beehive Brownies",      img: "icons/chocopistachio.jpg" },
            { name: "Baked Lemon Butter Tilapia", img: "icons/buttertilapia.jpg" }
        ]
    }
];

/* ---------- One helper for every previous/next viewer ---------- */
// viewer: element holding .prev and .next buttons
// items: array to cycle through (wraps at both ends)
// fading: elements that fade out/in while the content swaps
// render: function that draws one item
function cycle(viewer, items, fading, render) {
    let i = 0;

    const show = n => {
        i = (n + items.length) % items.length;
        fading.forEach(el => el.classList.add("fade"));
        setTimeout(() => {
            render(items[i]);
            fading.forEach(el => el.classList.remove("fade"));
        }, 200);
    };

    viewer.querySelector(".prev").addEventListener("click", () => show(i - 1));
    viewer.querySelector(".next").addEventListener("click", () => show(i + 1));
    render(items[0]);
}

/* ---------- Skills and education carousels (markup is built here) ---------- */
const carouselHTML = `
    <button class="arrow prev" aria-label="Previous">&#129032;</button>
    <figure class="slide">
        <img class="skill-img" alt="">
        <figcaption class="skill-name"></figcaption>
    </figure>
    <button class="arrow next" aria-label="Next">&#129034;</button>`;

document.querySelectorAll(".carousel").forEach(carousel => {
    carousel.innerHTML = carouselHTML;

    const slide = carousel.querySelector(".slide");
    const img   = carousel.querySelector("img");
    const label = carousel.querySelector(".skill-name");
    const desc  = carousel.closest(".carousel-layout")?.querySelector(".slide-description");

    cycle(carousel, skillSets[carousel.dataset.set], [slide, desc].filter(Boolean), item => {
        img.src = item.img;
        img.alt = item.name;
        label.textContent = item.name;
        if (item.year) label.insertAdjacentHTML("beforeend", `<span class="skill-year">${item.year}</span>`);
        if (desc) desc.textContent = item.desc;
    });
});

/* ---------- Hobbies viewer ---------- */
const hobbyViewer = document.querySelector(".hobby-viewer");

cycle(hobbyViewer, hobbies, [hobbyViewer.querySelector(".hobby-content")], hobby => {
    hobbyViewer.querySelector(".hobby-name").textContent = hobby.name;
    hobbyViewer.querySelector(".hobby-desc").textContent = hobby.desc;
    hobbyViewer.querySelector(".media-grid").innerHTML = hobby.media.map(m => `
        <figure class="media-item" tabindex="0">
            <img src="${m.img}" alt="${m.name}" loading="lazy" decoding="async">
            <figcaption>${m.name}</figcaption>
        </figure>`).join("");
});