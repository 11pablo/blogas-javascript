'use strict';

function titleClickHandler(event){  //wyświetlenie naciśniętego linku
  event.preventDefault; //ogranicza zmianę adresu url aby nie przewijał strony
  const clickedElement = this; //wskazuje na element
  //console.log('Link was clicked!');
  //console.log(event);
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active'); // odnalezienie wszystkich linków .titles
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  //event.preventDefault();
  //const clickedElement = this;
  clickedElement.classList.add('active');
  /* [DONE] get 'href' attribute from the clicked link */
  const clickedAttribute = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const wantedArticle = document.querySelector(clickedAttribute);
  //console.log(AndActiveArticles);
  
  
  /* [DONE] add class 'active' to the correct article */
  wantedArticle.classList.add('active');
}

/*const links = document.querySelectorAll('.titles a');
console.log(links);
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}*/



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector= '.post-author';
  //optArticleTag = '.post-tags a';

function generateTitleLinks(customSelector = ''){ //generowanie tytułów linków z boku
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  //console.log(titleList);
  titleList.innerHTML='';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles){
    /* get the article id */
    const ArticleId = article.getAttribute('id');
    //console.log(ArticleId);
  
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; //odnalezienie tytułu zawartośći dzięki innerHTML i zapis go do articleTitle
    //console.log(articleTitle);
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + ArticleId + '"><span>'+ articleTitle +'</span></a></li>';
    //console.log(linkHTML);
    /* insert link into titleList */
    /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/ // zła metoda przez powtarzanie ładowania linków w karzdej pętli
    //titleList.insertAdjacentHTML('beforeend', linkHTML); lepszy sposób
    html = html + linkHTML; //najlepszy sposób wyświetlanie poza pętlą
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();



function generateTags(){  //generowanie tagów na dole z listry w artykule
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagTitle = article.querySelector(optArticleTagsSelector); //miejsce docelowe tagu
    /* make html variable with empty string */
    let html = '';
    //console.log(tagTitle);
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(ArticleId);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#'+'tag-' + tag +'"><span>'+ tag +'&nbsp</span></a></li>';
      //console.log(linkHTML);
      /* add generated code to html variable */
      html = html + linkHTML;
    }
    /* END LOOP: for each tag */
    tagTitle.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */
    
  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){   //obsługa kliknięcia w tag
  /* prevent default action for this event */
  event.preventDefault;
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for (let activeTag of activeTagLinks){
  /* remove class active */
    activeTag.classList.remove('active');  
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksToTagHref = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let linkToHref of linksToTagHref){
    //console.log(linkToHref);
    /* add class active */
    linkToHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  //console.log('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){  //przerwanie nasłuchiwanie naciśnięcia
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
  console.log(links);
  //console.log(links);
  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){ //generowanie tagów autorów
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagAuthor = article.querySelector(optArticleAuthorSelector); //miejsce docelowe tagu
    //console.log(tagAuthor);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const authorTags = article.getAttribute('data-author');
    //console.log('autorTags',authorTags);
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-'+ authorTags +'"><span>'+ authorTags +'&nbsp</span></a></li>';
    console.log(linkHTML);
    /* add generated code to html variable */
    html = html + linkHTML;
    //console.log(html);
    /* insert HTML of all the links into the tags wrapper */
    tagAuthor.innerHTML = html;
    //console.log(tagAuthor);
  /* END LOOP: for each tag */
  }
/* END LOOP: for every article: */
}

generateAuthors();

function authorClickHandler(event){  //obsługa kliknięcia w tag
  /* prevent default action for this event */
  event.preventDefault;
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href); 
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all tag links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeAuthor of activeAuthorLinks){
    /* remove class active */
    activeAuthor.classList.remove('active');  
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const linksToAuthorHref = document.querySelectorAll('a[href="' + href + '"]');
  console.log(linksToAuthorHref);
  /* START LOOP: for each found tag link */
  for (let authorToHref of linksToAuthorHref){
    //console.log(linkToHref);
    /* add class active */
    authorToHref.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}



function addClickListenersToAuthors(){  //przerwanie nasłuchiwanie naciśnięcia
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log(links);
  /* START LOOP: for each link */
  for (let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();
