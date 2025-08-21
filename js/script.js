// Busca projetos do GitHub
const container = document.querySelector('.projects-grid');

container.innerHTML = '<p style="text-align: center; width: 100%; color: #a0a0a0;">Buscando projetos no GitHub...</p>';

fetch('https://api.github.com/users/Alan-mondego/repos')
  .then(response => {
    if (!response.ok) {
      throw new Error('Não foi possível buscar os repositórios. Verifique o nome de usuário.');
    }
    return response.json();
  })
  .then(repositorios => {
    
    const reposFiltrados = repositorios.filter(repo => !repo.fork && repo.description);
    
 
    container.innerHTML = '';

    reposFiltrados.slice(0, 6).forEach(repo => {
      const caixaProjeto = document.createElement('div');
      caixaProjeto.className = 'project-card';

      
      let imagemProjeto = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop'; // Padrão
      
      if (repo.language === 'JavaScript' || repo.language === 'TypeScript') {
        imagemProjeto = 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop';
      } else if (repo.language === 'Python') {
        imagemProjeto = 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop';
      } else if (repo.language === 'Java' || repo.language === 'C#') {
        imagemProjeto = 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop';
      } else if (repo.language === 'React') {
        imagemProjeto = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop';
      } else if (repo.language === 'HTML' || repo.language === 'CSS') {
        imagemProjeto = 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop';
      }

      caixaProjeto.innerHTML = `
        <div class="project-image">
          <img src="${imagemProjeto}" alt="${repo.name}">
          <div class="project-language">${repo.language || 'Outro'}</div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
          <p class="project-description">${repo.description}</p>
          <div class="project-stats">
            <span class="stat">
              <i class="fas fa-star"></i>
              ${repo.stargazers_count}
            </span>
            <span class="stat">
              <i class="fas fa-code-branch"></i>
              ${repo.forks_count}
            </span>
            <span class="stat">
              <i class="fas fa-eye"></i>
              ${repo.watchers_count}
            </span>
          </div>
          <div class="project-links">
            <a href="${repo.html_url}" class="project-link" target="_blank">
              <i class="fab fa-github"></i>
              Ver código
            </a>
            ${repo.homepage ? `
              <a href="${repo.homepage}" class="project-link" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                Ver demo
              </a>
            ` : ''}
          </div>
        </div>
      `;

      container.appendChild(caixaProjeto);
    });
  })
  .catch(error => {
    container.innerHTML = `<p style="text-align: center; width: 100%; color: #ff6b6b;">${error.message}</p>`;
  });
