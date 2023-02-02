export const Home = () => {
  const divContainer = document.createElement('div');
  divContainer.classList.add('home-container');
  divContainer.innerHTML = `
  <!-- Ana-Header -->
  <header class="home-header"></header>

    <!-- menu -->
    <!-- Fer-Main -->
    <main>
    <section class="home-stories"></section>
    <section class="home-post"></section>
    </main>
    `
    return divContainer;
}