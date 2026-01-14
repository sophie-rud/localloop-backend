import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Début du seeding de la base de données...');

    // 1. NETTOYAGE
    console.log('Nettoyage des données existantes...');

    await prisma.favoriteTracks.deleteMany();
    await prisma.step.deleteMany();
    await prisma.track.deleteMany();
    await prisma.place.deleteMany();
    await prisma.user.deleteMany();
    await prisma.theme.deleteMany();
    await prisma.department.deleteMany();
    await prisma.role.deleteMany();

    console.log('✅ Nettoyage terminé');

    // 2. ROLES
    console.log('Création des rôles...');

    const roleUser = await prisma.role.create({
        data: { id: 1, name: 'User' },
    });

    const roleAdmin = await prisma.role.create({
        data: { id: 2, name: 'Admin' },
    });

    console.log('✅ Rôles créés');

    // 3. USERS
    console.log('👥 Création des utilisateurs...');

    const hashedPassword = await bcrypt.hash('Password1', 10);

    const ali = await prisma.user.create({
        data: {
            id: 1,
            username: 'Ali',
            email: 'alice.dupont@gmail.com',
            password: hashedPassword,
            avatar: '/uploads/avatars/default.jpg',
            isActive: false,
            roleId: roleUser.id,
        },
    });

    const lily = await prisma.user.create({
        data: {
            id: 2,
            username: 'lily68',
            email: 'lily.stadt@gmail.com',
            password: hashedPassword,
            avatar: '/uploads/avatars/default.jpg',
            isActive: true,
            roleId: roleAdmin.id,
        },
    });

    const momo = await prisma.user.create({
        data: {
            id: 3,
            username: 'Momo67',
            email: 'momo@gmail.com',
            password: hashedPassword,
            avatar: '/uploads/avatars/default.jpg',
            isActive: true,
            roleId: roleUser.id,
        },
    });

    console.log('✅ Utilisateurs créés');

    // 4. THEMES
    console.log('Création des thèmes...');

    await prisma.theme.createMany({
        data: [
            { id: 1, name: 'Nature', icon: '🌿' },
            { id: 2, name: 'Urbain', icon: '🏙️' },
            { id: 3, name: 'Culture', icon: '🎨' },
            { id: 4, name: 'Sport', icon: '🏃‍♂️' },
            { id: 5, name: 'Gastronomie', icon: '🍽️' },
            { id: 6, name: 'Histoire', icon: '🏰' },
        ],
    });

    console.log('✅ Thèmes créés');

    // 5. DEPARTMENTS
    console.log('Création des départements...');

    const basRhin = await prisma.department.create({
        data: { id: 1, name: 'Bas-Rhin', code: '67' },
    });

    const hautRhin = await prisma.department.create({
        data: { id: 2, name: 'Haut-Rhin', code: '68' },
    });

    console.log('✅ Départements créés');

    // 6. PLACES
    console.log('Création des lieux...');

    await prisma.place.createMany({
        data: [
            {
                id: 1,
                name: 'Pont Saint-Pierre',
                city: 'Colmar',
                description: 'Petit pont pittoresque enjambant le canal Lauch, emblématique du quartier de la Petite Venise.',
                photo: '/uploads/places/pont-saint-pierre.jpg',
                latitude: 48.0793,
                longitude: 7.3582,
                departmentId: hautRhin.id,
            },
            {
                id: 2,
                name: 'Musée Unterlinden',
                city: 'Colmar',
                description: 'Ancien couvent transformé en musée, célèbre pour le retable d\'Issenheim.',
                photo: '/uploads/places/musee-unterlinden.jpg',
                latitude: 48.079,
                longitude: 7.358,
                departmentId: hautRhin.id,
            },
            {
                id: 3,
                name: 'Cathédrale Notre-Dame de Strasbourg',
                city: 'Strasbourg',
                description: 'Monument gothique emblématique de la ville.',
                photo: '/uploads/places/cathedrale-strasbourg.jpg',
                latitude: 48.5819,
                longitude: 7.7509,
                departmentId: basRhin.id,
            },
            {
                id: 4,
                name: 'Pont des Tanneurs',
                city: 'Strasbourg',
                description: 'Pont historique situé dans le quartier de la Petite France, offrant une vue sur les maisons à colombages et les canaux.',
                photo: '/uploads/places/pont-tanneurs.jpg',
                latitude: 48.5831,
                longitude: 7.7508,
                departmentId: basRhin.id,
            },
            {
                id: 5,
                name: 'Parking du Taennchel',
                city: 'Ribeauvillé',
                description: 'Parking qui se trouve au bas du village de Thannenkirch, point de départ de plusieurs itinéraires de randonnée.',
                photo: '/uploads/places/parking-taennchel.jpg',
                latitude: 48.2028,
                longitude: 7.3005,
                departmentId: hautRhin.id,
            },
            {
                id: 6,
                name: 'Place Kléber',
                city: 'Strasbourg',
                description: 'Cœur vivant de Strasbourg, point central idéal pour démarrer un parcours urbain.',
                photo: '/uploads/places/place-kleber.jpg',
                latitude: 48.5839,
                longitude: 7.7455,
                departmentId: basRhin.id,
            },
            {
                id: 7,
                name: 'Jardin des Deux Rives',
                city: 'Strasbourg',
                description: 'Grand parc le long du Rhin, parfait pour un parcours nature et transfrontalier.',
                photo: '/uploads/places/jardin-deux-rives.jpg',
                latitude: 48.5742,
                longitude: 7.8024,
                departmentId: basRhin.id,
            },
            {
                id: 8,
                name: 'Place Rapp',
                city: 'Colmar',
                description: 'Grande place arborée, idéale comme point de départ d’un parcours urbain.',
                photo: '/uploads/places/place-rapp.jpg',
                latitude: 48.0749,
                longitude: 7.3499,
                departmentId: hautRhin.id,
            },
            {
                id: 9,
                name: 'Champ de Mars',
                city: 'Colmar',
                description: 'Espace vert central, parfait pour une pause calme à proximité du centre historique.',
                photo: '/uploads/places/champ-de-mars.jpg',
                latitude: 48.0735,
                longitude: 7.3467,
                departmentId: hautRhin.id,
            },
            {
                id: 21,
                name: 'Place du Corbeau',
                city: 'Strasbourg',
                description: 'Point central proche du quai des Bateliers, parfait comme départ à vélo.',
                photo: '/uploads/places/place-corbeau.jpg',
                latitude: 48.5811,
                longitude: 7.7492,
                departmentId: basRhin.id,
            },
            {
                id: 22,
                name: 'Parc de l\'Orangerie',
                city: 'Strasbourg',
                description: 'Grand espace vert traversé par des pistes cyclables tranquilles.',
                photo: '/uploads/places/parc-orangerie.jpg',
                latitude: 48.5969,
                longitude: 7.7716,
                departmentId: basRhin.id,
            },
            {
                id: 23,
                name: 'Refuge des Trois Tables',
                city: 'Ribeauvillé',
                description: 'Petit refuge en lisière de forêt, idéal pour une première pause.',
                photo: '/uploads/places/refuge-trois-tables.jpg',
                latitude: 48.2052,
                longitude: 7.301,
                departmentId: hautRhin.id,
            },
            {
                id: 24,
                name: 'Belvédère du Rocher du Coucou',
                city: 'Ribeauvillé',
                description: 'Point de vue sur les châteaux et la plaine d\'Alsace.',
                photo: '/uploads/places/rocher-coucou.jpg',
                latitude: 48.207,
                longitude: 7.3091,
                departmentId: hautRhin.id,
            },
            {
                id: 25,
                name: 'Barrage du Lac Blanc',
                city: 'Orbey',
                description: 'Point de départ situé au niveau du barrage du lac.',
                photo: '/uploads/places/barrage-lac-blanc.jpg',
                latitude: 48.1374,
                longitude: 7.1198,
                departmentId: hautRhin.id,
            },
            {
                id: 26,
                name: 'Rocher Hans',
                city: 'Orbey',
                description: 'Formation rocheuse emblématique surplombant le lac.',
                photo:  '/uploads/places/rocher-hans.jpg',
                latitude: 48.1401,
                longitude: 7.1241,
                departmentId: hautRhin.id,
            },
        ],
    });

    console.log('✅ Lieux créés');

    // 7. TRACKS
    console.log('Création des parcours...');

    const track1 = await prisma.track.create({
        data: {
            id: 1,
            userId: ali.id,
            themeId: 3,
            title: 'Balade au cœur de Colmar',
            photo: '/uploads/tracks/colmar.jpg',
            duration: 210,
            distance: 5,
            difficulty: 'FACILE',
            presentation: 'Une balade pittoresque à travers les canaux et les maisons à colombages de Colmar.',
            isPublished: true,
        },
    });

    const track2 = await prisma.track.create({
        data: {
            id: 2,
            userId: lily.id,
            themeId: 6,
            title: 'Strasbourg historique et gourmand',
            photo: '/uploads/tracks/strasbourg-historique.jpg',
            duration: 240,
            distance: 6,
            difficulty: 'MOYEN',
            presentation: 'Découvrez l\'histoire et la gastronomie de Strasbourg, entre cathédrale, quartiers médiévaux et marchés.',
            isPublished: true,
        },
    });

    const track3 = await prisma.track.create({
        data: {
            id: 3,
            userId: ali.id,
            themeId: 1,
            title: 'Sentier des Roches et Forêt de Ribeauvillé',
            photo: '/uploads/tracks/ribeauville.jpg',
            duration: 150,
            distance: 4,
            difficulty: 'MOYEN',
            presentation: 'Une balade nature entre roches, forêt dense et points de vue sur le château de Saint-Ulrich.',
            isPublished: true,
        },
    });

    const track4 = await prisma.track.create({
        data: {
            id: 4,
            userId: lily.id,
            themeId: 4,
            title: 'Strasbourg à vélo',
            photo: '/uploads/tracks/strasbourg-velo.jpg',
            duration: 120,
            distance: 10,
            difficulty: 'SPORTIF',
            presentation: 'Un parcours à vélo qui longe les quais et les parcs de Strasbourg pour découvrir la ville autrement.',
            isPublished: true,
        },
    });

    const track12 = await prisma.track.create({
        data: {
            id: 12,
            userId: lily.id,
            themeId: 1,
            title: 'Autour du Lac Blanc et Rocher Hans',
            photo: '/uploads/tracks/lac-blanc.jpg',
            duration: 210,
            distance: 6.5,
            difficulty: 'MOYEN',
            presentation: 'Une boucle autour du Lac Blanc avec un passage panoramique au Rocher Hans.',
            isPublished: false,
        },
    });

    console.log('✅ Parcours créés');

    // 8. STEPS
    console.log('Création des étapes...');

    await prisma.step.createMany({
        data: [
            // Track 1 - Colmar
            {
                id: 1,
                trackId: track1.id,
                placeId: 1,
                name: 'Découverte de la Petite Venise',
                photo: '/uploads/steps/petite-venise.jpg',
                advice: 'Balade le long des canaux colorés.',
                anecdote: 'Surnommée Petite Venise depuis le XIXe siècle.',
                stepOrder: 1,
            },
            {
                id: 2,
                trackId: track1.id,
                placeId: 2,
                name: 'Visite du Musée Unterlinden',
                photo: '/uploads/steps/musee.jpg',
                advice: 'Découvrez les œuvres médiévales et le retable d\'Issenheim.',
                anecdote: 'Le musée était autrefois un couvent dominicain.',
                stepOrder: 2,
            },
            {
                id: 7,
                trackId: track1.id,
                placeId: 8,
                name: 'Statue du Général Rapp',
                photo: '/uploads/steps/statue-rapp.jpg',
                advice: 'Faites une pause au centre de la place pour apprécier l’ambiance et la perspective.',
                anecdote: 'Jean Rapp fut général de Napoléon et natif de Colmar.',
                stepOrder: 3,
            },
            {
                id: 8,
                trackId: track1.id,
                placeId: 9,
                name: 'Préfecture du Haut-Rhin',
                photo: '/uploads/steps/prefecture-haut-rhin.jpg',
                advice: 'Contournez le bâtiment pour profiter du calme du parc environnant.',
                anecdote: 'Le Champ de Mars servait autrefois de terrain militaire avant de devenir un espace public.',
                stepOrder: 4,
            },

            // Track 2 - Strasbourg historique
            {
                id: 3,
                trackId: track2.id,
                placeId: 3,
                name: 'Cathédrale de Strasbourg',
                photo: '/uploads/steps/cathedrale.jpg',
                advice: 'Admirez la flèche gothique et les vitraux colorés.',
                anecdote: 'Sa flèche a été la plus haute du monde jusqu\'au XIXe siècle.',
                stepOrder: 1,
            },
            {
                id: 4,
                trackId: track2.id,
                placeId: 4,
                name: 'Promenade dans La Petite France',
                photo: '/uploads/steps/petite-france.jpg',
                advice: 'Quartier médiéval pittoresque le long des canaux.',
                anecdote: 'Autrefois quartier des tanneurs, pêcheurs et meuniers.',
                stepOrder: 2,
            },
            {
                id: 6,
                trackId: track2.id,
                placeId: 6,
                name: 'Façade de l’Aubette',
                photo: '/uploads/steps/aubette.jpg',
                advice: 'Prenez le temps d’observer les détails architecturaux avant de poursuivre le parcours.',
                anecdote: 'L’Aubette a accueilli au XXe siècle des artistes d’avant-garde comme Theo van Doesburg.',
                stepOrder: 3,
            },
            // Track 3 - Ribeauvillé
            {
                id: 5,
                trackId: track3.id,
                placeId: 5,
                name: 'Départ vers le sentier des Roches',
                photo: '/uploads/steps/depart-roches.jpg',
                advice: 'Prévoir de bonnes chaussures ! Plusieurs randonnées partent de ce point, vous pouvez compléter votre excursion avec d\'autres parcours.',
                anecdote: null,
                stepOrder: 1,
            },
            {
                id: 33,
                trackId: track3.id,
                placeId: 23,
                name: 'Refuge des Trois Tables',
                photo:  '/uploads/steps/trois-tables.jpg',
                advice: 'Le sol peut être glissant après la pluie, privilégier des bâtons.',
                anecdote: 'Le refuge doit son nom à trois anciennes tables en pierre présentes au XIXe siècle.',
                stepOrder: 2,
            },
            {
                id: 34,
                trackId: track3.id,
                placeId: 24,
                name: 'Belvédère du Rocher du Coucou',
                photo: '/uploads/steps/rocher-coucou-step.jpg',
                advice: 'Un passage exposé, rester attentif au vent fort.',
                anecdote: 'On raconte qu\'un ermite local imitait les oiseaux pour amuser les randonneurs.',
                stepOrder: 3,
            },
            // Track 4 - Vélo Strasbourg
            {
                id: 31,
                trackId: track4.id,
                placeId: 21,
                name: 'Départ depuis la Place du Corbeau',
                photo: '/uploads/steps/place-corbeau-step.jpg',
                advice: 'Faire attention aux piétons sur les quais, surtout en journée.',
                anecdote: 'La place tient son nom d\'une ancienne auberge médiévale très réputée.',
                stepOrder: 1,
            },
            {
                id: 32,
                trackId: track4.id,
                placeId: 22,
                name: 'Pause au Parc de l\'Orangerie',
                photo: '/uploads/steps/orangerie.jpg',
                advice: 'Idéal pour prendre quelques photos ou remplir vos gourdes.',
                anecdote: 'Le parc abrite un arbre planté pour commémorer la visite de Napoléon III.',
                stepOrder: 2,
            },
            {
                id: 9,
                trackId: track4.id,
                placeId: 7,
                name: 'Passerelle Mimram',
                photo: '/uploads/steps/passerelle-mimram.jpg',
                advice: 'Traversez la passerelle pour profiter d’un panorama unique sur le Rhin.',
                anecdote: 'La passerelle symbolise l’amitié franco-allemande et relie Strasbourg à Kehl.',
                stepOrder: 3,
            },

            // Track 12 - Lac Blanc
            {
                id: 35,
                trackId: track12.id,
                placeId: 25,
                name: 'Départ au Barrage du Lac Blanc',
                photo: '/uploads/steps/barrage.jpg',
                advice: 'Le matin, la brume est dense, attention à la visibilité.',
                anecdote: 'Une légende locale dit qu\'un pêcheur solitaire aurait aperçu un \'poisson blanc géant\'.',
                stepOrder: 1,
            },
            {
                id: 36,
                trackId: track12.id,
                placeId: 26,
                name: 'Passage au Rocher Hans',
                photo: '/uploads/steps/rocher-hans-step.jpg',
                advice: 'Vent fort en hauteur, garder les affaires bien sécurisées.',
                anecdote: 'Un mythe raconte que le Rocher porte le nom d\'un géant alsacien facétieux.',
                stepOrder: 2,
            },
        ],
    });

    console.log('✅ Étapes créées');

    // 9. FAVORIS
    console.log('Création des favoris...');

    await prisma.favoriteTracks.createMany({
        data: [
            { userId: ali.id, trackId: track2.id },
            { userId: ali.id, trackId: track12.id },
            { userId: lily.id, trackId: track1.id },
            { userId: momo.id, trackId: track1.id },
            { userId: momo.id, trackId: track3.id },
        ],
    });

    console.log('✅ Favoris créés');

    // RÉSUMÉ
    console.log('Seeding terminé avec succès !');
}

main()
    .catch((e) => {
        console.error('Erreur lors du seeding :', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
