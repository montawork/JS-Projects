// select elements from html
const input = document.querySelector('.input');
const form = document.querySelector('.form');
const main = document.querySelector('main');

// API url
const url = 'https://api.github.com/users/';

async function getUser(user) {
  const res = await fetch(url + user);
  const data = await res.json();
  return data;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const user = await getUser(input.value);

  if (user.message !== 'Not Found' && user.name) {
    const {
      avatar_url,
      name,
      bio,
      followers,
      following,
      public_repos,
      html_url,
      repos_url,
    } = user;

    async function fetchRepos() {
      const res = await fetch(repos_url);
      const data = await res.json();
      return data;
    }

    const allRepos = await fetchRepos();
    const reposList = [];
    allRepos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .forEach((repo) => {
        reposList.push(`
         <a class="repo-link" href="${repo.html_url}" target="_blank">${repo.name}</a>
        `);
      });

    const p = document.createElement('p');
    p.innerHTML = reposList.join('');

    main.innerHTML = `
    <section class="profile">
    <div class="img">
      <img src="${avatar_url}" alt="" />
    </div>
    <div class="info">
      <h3 class="name"> <a href="${html_url}" target="_blank">${name} <i class="fa-solid fa-up-right-from-square link"></i></a><h3>
      <p class="job">Frontend developer</p>
      <p class="desc">${bio || ''}</p>
      <footer>
        <div>
          <div class="footer-info">
            <small>Followers</small>
            <span>${followers}</span>
          </div>
          <div class="footer-info">
            <small>Following</small>
            <span>${following}</span>
          </div>
          <div class="footer-info">
            <small>Repos</small>
            <span>${public_repos}</span>
          </div>
        </div>
      </footer>
    </div>
  </section>
  <h3 class="repos-title">Repos</h3>
  `;

    main.appendChild(p);
  }

  input.value = '';
});
