const FilterItems = [
  { dataFilter: "bag", src: "bag-1.jpg" },
  { dataFilter: "camera", src: "camera-1.jpg" },
  { dataFilter: "camera", src: "camera-2.jpg" },
  { dataFilter: "headphone", src: "headphone-1.jpg" },
  { dataFilter: "headphone", src: "headphone-2.jpg" },
  { dataFilter: "shoe", src: "shoe-1.jpg" },
  { dataFilter: "shoe", src: "shoe-2.jpg" },
  { dataFilter: "watch", src: "watch-1.jpg" },
];

const imageWrapper = document.querySelector(".filter-images");

FilterItems.forEach((item) => {
  const itemElmt = `
  <div class="filter-image" data-filter="${item.dataFilter}">
  <span>
    <img src="images/${item.src}" alt="" />
  </span>
</div>`;

  imageWrapper.insertAdjacentHTML("beforeend", itemElmt);
});

const btns = document.querySelectorAll(".filter-btns button");
const images = document.querySelectorAll(".filter-image");
const lightBox = document.querySelector(".light-box");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".ri-close-line");

const activateLightBox = (thisElmt) => {
  const thisElmtSrc = thisElmt.querySelector("img").getAttribute("src");
  const thisElmtDataFilter = thisElmt.getAttribute("data-filter");
  const firstLetter = thisElmtDataFilter.charAt(0).toUpperCase();

  const remainLetters = thisElmtDataFilter.slice(1);

  const cateElmt = document.querySelector(".title p");

  cateElmt.textContent = firstLetter + remainLetters;


  // 함수가 실행되면 클릭된 모든 이미지 요소의 active 삭제
  images.forEach((img) => img.classList.remove("active"));
  // 클릭한 대상 이미지 요소의 active 클래스 추가
  thisElmt.classList.add("active");

  lightBox.querySelector("img").setAttribute("src", thisElmtSrc);

  lightBox.classList.add("show");
  overlay.classList.add("show");
};

// 이미지 요소들을 순회하여 각각을 클릭했을 때 activeLightBox 함수 실행 : 클릭한 대상 요소를 파라미터로 전달
images.forEach((img) => {
  img.addEventListener("click", function () {
    activateLightBox(this);
  });
});

// closeBtn.addEventListener("click", function () {
//   lightBox.classList.remove("show");
//   overlay.classList.remove("show");
// });

// overlay.addEventListener("click", function () {
//   lightBox.classList.remove("show");
//   overlay.classList.remove("show");
// });

// method : 어떠한 객체의 멤버가 함수일 경우 메서드라고 부른다.
// Array.from() : 유사배열(NodeList, HTMLcollection)을 정식 배열로 전환

// Array.from(images).filter((image) => {
//   image.classList.remove("show");
//   image.classList.add("hide");

function showItems(thisItem) {
  const thisCategory = thisItem.getAttribute("data-filter");

  // ---- refactoring ----
  images.forEach((image) => {
    image.classList.add("hide");
    image.classList.remove("show");
  });

  if (thisCategory === "all") {
    images.forEach((image) => {
      image.classList.add("show");
      image.classList.remove("hide");
    });
  }

  const thisImage = Array.from(images).filter(
    (image) => image.getAttribute("data-filter") === thisCategory
  );
  thisImage.forEach((activatedItem) => {
    activatedItem.classList.add("show");
    activatedItem.classList.remove("hide");
  });
}

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    btns.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    images.forEach((image) => {
      image.classList.add("hide");
      image.classList.remove("show");
    });

    setTimeout(() => {
      showItems(this);
    }, 100);
  });
});

function closeLightBox() {
  lightBox.classList.remove("show");
  overlay.classList.remove("show");
}

// 이벤트 실행 함수를 전달할 때 ()를 붙이지 않는다.
closeBtn.addEventListener("click", closeLightBox);
overlay.addEventListener("click", closeLightBox);

// 첫번째 파라미터 : 함함수 - 실행할 코드, 두번째 파라미터 : 숫자 - 시간(밀리초) == 밀리초 단위 시간 이후 함수 실행
// setTimeout(function () {
//   alert("Hello World");
// }, 2000);

const timerId = setInterval(() => console.log("째깍"), 1000);

setTimeout(() => {
  clearInterval(timerId);
}, 5000);
