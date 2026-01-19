// require('dotenv').config();
// const { Client } = require('pg');
// const bcrypt = require('bcrypt');

import "dotenv/config";
import { Client } from 'pg';
import bcrypt from 'bcrypt';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function main() {
    console.log('Début du seeding...');

    await client.connect();

    // Nettoyage
    console.log('Nettoyage des tables...');
    const tables = [
        'FavoriteTracks',
        'Step',
        'Track',
        'Place',
        'User',
        'Theme',
        'Department',
        'Role',
    ];

    for (const table of tables) {
        await client.query(`DELETE FROM "${table}";`);
    }
    console.log('Nettoyage terminé');

    // Roles
    console.log('Création des rôles...');
    await client.query(`INSERT INTO "Role" (id, name) VALUES (1, 'User'), (2, 'Admin');`);

    // Users
    console.log('Création des utilisateurs...');
    const hashedPassword = await bcrypt.hash('Password1', 10);

    const users = [
        { id: 1, username: 'Ali', email: 'alice.dupont@gmail.com', roleId: 1, isActive: false },
        { id: 2, username: 'lily68', email: 'lily.stadt@gmail.com', roleId: 2, isActive: true },
        { id: 3, username: 'Momo67', email: 'momo@gmail.com', roleId: 1, isActive: true },
    ];

    for (const u of users) {
        const now = new Date();
        await client.query(
            `INSERT INTO "User" (id, username, email, password, avatar, "isActive", "roleId", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [u.id, u.username, u.email, hashedPassword, '/uploads/avatars/default.jpg', u.isActive, u.roleId, now, now]
        );
    }

    // Themes
    console.log('Création des thèmes...');
    await client.query(`
    INSERT INTO "Theme" (id, name, icon) VALUES
    (1, 'Nature', '🌿'),
    (2, 'Urbain', '🏙️'),
    (3, 'Culture', '🎨'),
    (4, 'Sport', '🏃‍♂️'),
    (5, 'Gastronomie', '🍽️'),
    (6, 'Histoire', '🏰');
  `);

    // Departments
    console.log('Création des départements...');
    await client.query(`
    INSERT INTO "Department" (id, name, code) VALUES
    (1, 'Bas-Rhin', '67'),
    (2, 'Haut-Rhin', '68');
  `);

    // Places
    console.log('Création des lieux...');
    const places = [
        { id: 1, name: 'Pont Saint-Pierre', city: 'Colmar', description: 'Petit pont pittoresque enjambant le canal Lauch, emblématique du quartier de la Petite Venise.', photo: '/uploads/places/pont-saint-pierre.jpg', latitude: 48.0793, longitude: 7.3582, departmentId: 2 },
        { id: 2, name: 'Musée Unterlinden', city: 'Colmar', description: 'Ancien couvent transformé en musée, célèbre pour le retable d\'Issenheim.', photo: '/uploads/places/musee-unterlinden.jpg', latitude: 48.079, longitude: 7.358, departmentId: 2 },
        { id: 3, name: 'Cathédrale Notre-Dame de Strasbourg', city: 'Strasbourg', description: 'Monument gothique emblématique de la ville.', photo: '/uploads/places/cathedrale-strasbourg.jpg', latitude: 48.5819, longitude: 7.7509, departmentId: 1 },
        { id: 4, name: 'Pont des Tanneurs', city: 'Strasbourg', description: 'Pont historique situé dans le quartier de la Petite France, offrant une vue sur les maisons à colombages et les canaux.', photo: '/uploads/places/pont-tanneurs.jpg', latitude: 48.5831, longitude: 7.7508, departmentId: 1 },
        { id: 5, name: 'Parking du Taennchel', city: 'Ribeauvillé', description: 'Parking qui se trouve au bas du village de Thannenkirch, point de départ de plusieurs itinéraires de randonnée.', photo: '/uploads/places/parking-taennchel.jpg', latitude: 48.2028, longitude: 7.3005, departmentId: 2 },
        { id: 6, name: 'Place Kléber', city: 'Strasbourg', description: 'Cœur vivant de Strasbourg, point central idéal pour démarrer un parcours urbain.', photo: '/uploads/places/place-kleber.jpg', latitude: 48.5839, longitude: 7.7455, departmentId: 1 },
        { id: 7, name: 'Jardin des Deux Rives', city: 'Strasbourg', description: 'Grand parc le long du Rhin, parfait pour un parcours nature et transfrontalier.', photo: '/uploads/places/jardin-deux-rives.jpg', latitude: 48.5742, longitude: 7.8024, departmentId: 1 },
        { id: 8, name: 'Place Rapp', city: 'Colmar', description: 'Grande place arborée, idéale comme point de départ d’un parcours urbain.', photo: '/uploads/places/place-rapp.jpg', latitude: 48.0749, longitude: 7.3499, departmentId: 2 },
        { id: 9, name: 'Champ de Mars', city: 'Colmar', description: 'Espace vert central, parfait pour une pause calme à proximité du centre historique.', photo: '/uploads/places/champ-de-mars.jpg', latitude: 48.0735, longitude: 7.3467, departmentId: 2 },
        { id: 21, name: 'Place du Corbeau', city: 'Strasbourg', description: 'Point central proche du quai des Bateliers, parfait comme départ à vélo.', photo: '/uploads/places/place-corbeau.jpg', latitude: 48.5811, longitude: 7.7492, departmentId: 1 },
        { id: 22, name: 'Parc de l\'Orangerie', city: 'Strasbourg', description: 'Grand espace vert traversé par des pistes cyclables tranquilles.', photo: '/uploads/places/parc-orangerie.jpg', latitude: 48.5969, longitude: 7.7716, departmentId: 1 },
        { id: 23, name: 'Refuge des Trois Tables', city: 'Ribeauvillé', description: 'Petit refuge en lisière de forêt, idéal pour une première pause.', photo: '/uploads/places/refuge-trois-tables.jpg', latitude: 48.2052, longitude: 7.301, departmentId: 2 },
        { id: 24, name: 'Belvédère du Rocher du Coucou', city: 'Ribeauvillé', description: 'Point de vue sur les châteaux et la plaine d\'Alsace.', photo: '/uploads/places/rocher-coucou.jpg', latitude: 48.207, longitude: 7.3091, departmentId: 2 },
        { id: 25, name: 'Barrage du Lac Blanc', city: 'Orbey', description: 'Point de départ situé au niveau du barrage du lac.', photo: '/uploads/places/barrage-lac-blanc.jpg', latitude: 48.1374, longitude: 7.1198, departmentId: 2 },
        { id: 26, name: 'Rocher Hans', city: 'Orbey', description: 'Formation rocheuse emblématique surplombant le lac.', photo: '/uploads/places/rocher-hans.jpg', latitude: 48.1401, longitude: 7.1241, departmentId: 2 },
    ];

    for (const p of places) {
        const now = new Date();
        await client.query(
            `INSERT INTO "Place" (id, name, city, description, photo, latitude, longitude, "departmentId", "createdAt", "updatedAt")
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [p.id, p.name, p.city, p.description, '/uploads/places/default.jpg', p.latitude, p.longitude, p.departmentId, now, now]
        );
    }
    // Tracks
    console.log('Création des parcours...');
    const tracks = [
        { id: 1, userId: 1, themeId: 3, title: 'Balade au cœur de Colmar', photo: '/uploads/tracks/colmar.jpg', duration: 210, distance: 5, difficulty: 'FACILE', presentation: 'Une balade pittoresque à travers les canaux et les maisons à colombages de Colmar.', isPublished: true },
        { id: 2, userId: 2, themeId: 6, title: 'Strasbourg historique et gourmand', photo: '/uploads/tracks/strasbourg-historique.jpg', duration: 240, distance: 6, difficulty: 'MOYEN', presentation: 'Découvrez l\'histoire et la gastronomie de Strasbourg, entre cathédrale, quartiers médiévaux et marchés.', isPublished: true },
        { id: 3, userId: 1, themeId: 1, title: 'Sentier des Roches et Forêt de Ribeauvillé', photo: '/uploads/tracks/ribeauville.jpg', duration: 150, distance: 4, difficulty: 'MOYEN', presentation: 'Une balade nature entre roches, forêt dense et points de vue sur le château de Saint-Ulrich.', isPublished: true },
        { id: 4, userId: 2, themeId: 4, title: 'Strasbourg à vélo', photo: '/uploads/tracks/strasbourg-velo.jpg', duration: 120, distance: 10, difficulty: 'SPORTIF', presentation: 'Un parcours à vélo qui longe les quais et les parcs de Strasbourg pour découvrir la ville autrement.', isPublished: true },
        { id: 12, userId: 2, themeId: 1, title: 'Autour du Lac Blanc et Rocher Hans', photo: '/uploads/tracks/lac-blanc.jpg', duration: 210, distance: 6.5, difficulty: 'MOYEN', presentation: 'Une boucle autour du Lac Blanc avec un passage panoramique au Rocher Hans.', isPublished: false },
    ];

    for (const t of tracks) {
        const now = new Date();
        await client.query(
            `INSERT INTO "Track" (id, "userId", "themeId", title, photo, duration, distance, difficulty, presentation, "isPublished", "createdAt", "updatedAt")
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [t.id, t.userId, t.themeId, t.title, '/uploads/tracks/default.jpg', t.duration, t.distance, t.difficulty, t.presentation, t.isPublished, now, now]
        );
    }

    // Steps
    console.log('Création des étapes...');
    const steps = [
        // Track 1 - Colmar
        { id: 1, trackId: 1, placeId: 1, name: 'Découverte de la Petite Venise', photo: '/uploads/steps/petite-venise.jpg', advice: 'Balade le long des canaux colorés.', anecdote: 'Surnommée Petite Venise depuis le XIXe siècle.', stepOrder: 1 },
        { id: 2, trackId: 1, placeId: 2, name: 'Visite du Musée Unterlinden', photo: '/uploads/steps/musee.jpg', advice: 'Découvrez les œuvres médiévales et le retable d\'Issenheim.', anecdote: 'Le musée était autrefois un couvent dominicain.', stepOrder: 2 },
        { id: 7, trackId: 1, placeId: 8, name: 'Statue du Général Rapp', photo: '/uploads/steps/statue-rapp.jpg', advice: 'Faites une pause au centre de la place pour apprécier l’ambiance et la perspective.', anecdote: 'Jean Rapp fut général de Napoléon et natif de Colmar.', stepOrder: 3 },
        { id: 8, trackId: 1, placeId: 9, name: 'Préfecture du Haut-Rhin', photo: '/uploads/steps/prefecture-haut-rhin.jpg', advice: 'Contournez le bâtiment pour profiter du calme du parc environnant.', anecdote: 'Le Champ de Mars servait autrefois de terrain militaire avant de devenir un espace public.', stepOrder: 4 },

        // Track 2 - Strasbourg historique
        { id: 3, trackId: 2, placeId: 3, name: 'Cathédrale de Strasbourg', photo: '/uploads/steps/cathedrale.jpg', advice: 'Admirez la flèche gothique et les vitraux colorés.', anecdote: 'Sa flèche a été la plus haute du monde jusqu\'au XIXe siècle.', stepOrder: 1 },
        { id: 4, trackId: 2, placeId: 4, name: 'Promenade dans La Petite France', photo: '/uploads/steps/petite-france.jpg', advice: 'Quartier médiéval pittoresque le long des canaux.', anecdote: 'Autrefois quartier des tanneurs, pêcheurs et meuniers.', stepOrder: 2 },
        { id: 6, trackId: 2, placeId: 6, name: 'Façade de l’Aubette', photo: '/uploads/steps/aubette.jpg', advice: 'Prenez le temps d’observer les détails architecturaux avant de poursuivre le parcours.', anecdote: 'L’Aubette a accueilli au XXe siècle des artistes d’avant-garde comme Theo van Doesburg.', stepOrder: 3 },

        // Track 3 - Ribeauvillé
        { id: 5, trackId: 3, placeId: 5, name: 'Départ vers le sentier des Roches', photo: '/uploads/steps/depart-roches.jpg', advice: 'Prévoir de bonnes chaussures ! Plusieurs randonnées partent de ce point, vous pouvez compléter votre excursion avec d\'autres parcours.', anecdote: null, stepOrder: 1 },
        { id: 33, trackId: 3, placeId: 23, name: 'Refuge des Trois Tables', photo: '/uploads/steps/trois-tables.jpg', advice: 'Le sol peut être glissant après la pluie, privilégier des bâtons.', anecdote: 'Le refuge doit son nom à trois anciennes tables en pierre présentes au XIXe siècle.', stepOrder: 2 },
        { id: 34, trackId: 3, placeId: 24, name: 'Belvédère du Rocher du Coucou', photo: '/uploads/steps/rocher-coucou-step.jpg', advice: 'Un passage exposé, rester attentif au vent fort.', anecdote: 'On raconte qu\'un ermite local imitait les oiseaux pour amuser les randonneurs.', stepOrder: 3 },

        // Track 4 - Vélo Strasbourg
        { id: 31, trackId: 4, placeId: 21, name: 'Départ depuis la Place du Corbeau', photo: '/uploads/steps/place-corbeau-step.jpg', advice: 'Faire attention aux piétons sur les quais, surtout en journée.', anecdote: 'La place tient son nom d\'une ancienne auberge médiévale très réputée.', stepOrder: 1 },
        { id: 32, trackId: 4, placeId: 22, name: 'Pause au Parc de l\'Orangerie', photo: '/uploads/steps/orangerie.jpg', advice: 'Idéal pour prendre quelques photos ou remplir vos gourdes.', anecdote: 'Le parc abrite un arbre planté pour commémorer la visite de Napoléon III.', stepOrder: 2 },
        { id: 9, trackId: 4, placeId: 7, name: 'Passerelle Mimram', photo: '/uploads/steps/passerelle-mimram.jpg', advice: 'Traversez la passerelle pour profiter d’un panorama unique sur le Rhin.', anecdote: 'La passerelle symbolise l’amitié franco-allemande et relie Strasbourg à Kehl.', stepOrder: 3 },

        // Track 12 - Lac Blanc
        { id: 35, trackId: 12, placeId: 25, name: 'Départ au Barrage du Lac Blanc', photo: '/uploads/steps/barrage.jpg', advice: 'Le matin, la brume est dense, attention à la visibilité.', anecdote: 'Une légende locale dit qu\'un pêcheur solitaire aurait aperçu un \'poisson blanc géant\'.', stepOrder: 1 },
        { id: 36, trackId: 12, placeId: 26, name: 'Passage au Rocher Hans', photo: '/uploads/steps/rocher-hans-step.jpg', advice: 'Vent fort en hauteur, garder les affaires bien sécurisées.', anecdote: 'Un mythe raconte que le Rocher porte le nom d\'un géant alsacien facétieux.', stepOrder: 2 },
    ];

    for (const s of steps) {
        const now = new Date();
        await client.query(
            `INSERT INTO "Step" (id, "trackId", "placeId", name, photo, advice, anecdote, "stepOrder", "createdAt", "updatedAt")
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [s.id, s.trackId, s.placeId, s.name, '/uploads/steps/default.jpg', s.advice, s.anecdote, s.stepOrder, now, now]
        );
    }

    // FavoriteTracks
    console.log('Création des favoris...');
    const favorites = [
        { userId: 1, trackId: 2 },
        { userId: 1, trackId: 12 },
        { userId: 2, trackId: 1 },
        { userId: 3, trackId: 1 },
        { userId: 3, trackId: 3 },
    ];

    for (const f of favorites) {
        await client.query(
            `INSERT INTO "FavoriteTracks" ("userId","trackId") VALUES ($1,$2)`,
            [f.userId, f.trackId]
        );
    }

    await client.end();
    console.log('Seed terminé avec succès !');
}

main().catch(err => {
    console.error('Erreur lors du seed :', err);
    client.end();
});
