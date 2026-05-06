import Link from 'next/link';
import RestaurantCard from '../components/RestaurantCard';
import { getRestaurants } from '../lib/api';

export default async function HomePage() {
  let restaurants = [];
  let error = null;

  try {
    restaurants = await getRestaurants();
  } catch (err) {
    error = err.message;
  }

  return (
    <>
      <section className="hero">
        <h1>🍛 Bienvenue sur TerrangaFood</h1>
        <p>
          Découvrez les meilleurs restaurants de Dakar et commandez vos plats
          préférés en quelques clics.
        </p>

        {/* 🔥 BOUTON AJOUTÉ */}
        <Link href="/mes-commandes">
          <button className="btn-commander" style={{ marginTop: '15px' }}>
            Mes commandes
          </button>
        </Link>
      </section>

      <section className="container">
        {error ? (
          <div className="error">
            <p>⚠️ {error}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#6B7280' }}>
              Vérifiez que l&apos;API est lancée sur le port 3001.
            </p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="loading">
            <p>Aucun restaurant trouvé.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '8px', color: '#6B7280' }}>
              Lancez <code>npm run seed</code> dans le dossier <code>api/</code>
            </p>
          </div>
        ) : (
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}