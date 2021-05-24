javascript:function getNikkeiText() {
  const formatDatetime2RoamFormat = (datetime) => {
    const matched = /(\d+)年(\d+)月(\d+)日/.exec(datetime);
    const d = new Date(matched[1], matched[2]-1, matched[3]);
    const ord = (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
    const year = d.getFullYear();
    const month = d.toLocaleString('en-us', { month: 'long' });
    const date = ord(d.getDate());
    return `${month} ${date}, ${year}`
  }
  
  const title = document.querySelector(".title_tyodebu").textContent;
  const mainTexts = document.querySelector(".container_cz8tiun");
  const source = location.href;
  const publishedDatetime = document.querySelector('.TimeStamp_t165nkxq').childNodes[0].textContent;
  const publishedDate = formatDatetime2RoamFormat(publishedDatetime);
  const tag = document.querySelector(".link_lsiljhk").textContent;

  const attributes = [
    "#[[日経新聞]]",
    `Title:: ${title}`,
    `Tags:: #[[${tag}]]`,
    `Published:: [[${publishedDate}]]`,
    `Source:: ${source}`
  ];
  let res = attributes.join("\n");

  mainTexts.childNodes.forEach(e => {
    var tagName = e.tagName;
    if (tagName === "P") {
      res += `${e.textContent}\n`;
    }
    if (tagName === "FIGURE") {
      const src = e.querySelector(".image_it6330k").src;

      const caption = e.querySelector(".caption_cr631ji");
      if (caption) {
        res += `![](${src})${caption.textContent}\n`;
      } else {
        res += `![](${src})\n`;
      }
    }
  });

  if (navigator.clipboard) {
    navigator.clipboard.writeText(res);
  }

};getNikkeiText();
