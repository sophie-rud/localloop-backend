# Spécifications API REST

**URL de base :** `https://domaine/api`  
**Format :** JSON  
**Authentification :** JWT (JSON Web Token)

## Headers requis

### Pour toutes les requêtes :
```http
Content-Type: application/json
```

### Pour les routes protégées :
```http
Authorization: Bearer {token}
```

### Pour les requêtes avec upload de fichier :
```http
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

## CORS

Le serveur doit autoriser les requêtes depuis le frontend Angular qui tourne sur `https://domaine.fr`.

Configuration CORS requise :
- Origin : `https://domaine.fr`
- Methods : `GET, POST, PUT, DELETE, OPTIONS`
- Headers : `Origin, X-Requested-With, Content-Type, Accept, Authorization`

## Authentification

L'API utilise des tokens JWT pour sécuriser les endpoints.

### Format du token JWT

Le token contient les informations suivantes :
```json
{
  "userId": "1",
  "iat": 123456,
  "exp": 123456
}
```

**Durée de validité :** 1 heure

### Utilisation du token

Le token doit être inclus dans l'en-tête `Authorization` avec le préfixe `Bearer` :

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Renouvellement du token

Le token n'est pas renouvelable automatiquement ou Refresh token

## Codes HTTP

| Code    | Statut                | Quand l'utiliser                                           |
|---------|-----------------------|------------------------------------------------------------|
| **200** | OK                    | Requête réussie                                            |
| **201** | Created               | Ressource créée avec succès                                |
| **204** | No Content            | Requête traitée avec succès, aucune information à renvoyer |
| **400** | Bad Request           | Requête invalide                                           |
| **401** | Unauthorized          | Accès à la ressource protégé par authentification          |
| **403** | Forbidden             | Accès à la ressource interdit                              |
| **401** | Unauthorized          | Accès à la ressource protégé par authentification          |
| **404** | Not Found             | Ressource non trouvée                                      |
| **500** | Internal Server Error | Erreur interne sur le serveur                              |
| **503** | Service Unavailable   | Serveur actuellement indisponible                          |
| **504** | Gateway Timeout       | Le serveur n'a pas répondu à temps                         |
|         |                       |                                                            |

## Format des erreurs

```json
{
  "error": {
    "message": "Description de l'erreur"
  }
}
```

# Spécifications API REST

| Verbe      | Endpoint                               | Request Body                                                  | Réponse attendue                                                         | Codes status             | Fonction                                                |
|------------|----------------------------------------|---------------------------------------------------------------|--------------------------------------------------------------------------|--------------------------|---------------------------------------------------------|
| **POST**   | `/api/login`                           | `{ "email": string, "password": string }`                     | `{ "userId": string, "token": string }`                                  | 201, 400, 401, 403       | Authentifier un utilisateur et renvoyer un token JWT    |
| **POST**   | `/api/signup`                          | `{ "username": string, "email": string, "password": string }` | `{ "id": int, "username": string, "email": string, "password": string }` | 201, 400, 401, 403       | Créer un nouvel utilisateur                             |
| **GET**    | `/api/tracks`                          |                                                               | Tableau d'objets `TrackResponse`                                         | 200, 401, 403, 404       | Lister tous les parcours                                |
| **GET**    | `/api/tracks/{id}`                     |                                                               | Objet `TrackResponse`                                                    | 200, 401, 403, 404       | Récupérer un parcours spécifique                        |
| **POST**   | `/api/tracks`                          | Objet `TrackRequest`                                          | Objet `TrackResponse`                                                    | 201, 400, 401, 403       | Créer un parcours                                       |
| **PUT**    | `/api/tracks/{id}`                     | Objet `TrackRequest`                                          | Objet `TrackResponse`                                                    | 200, 400, 401, 403, 404  | Modifier un parcours                                    |
| **DELETE** | `/api/tracks/{id}`                     |                                                               |                                                                          | 204, 400, 401, 403, 404  | Supprimer un parcours                                   |
| **GET**    | `/api/tracks/{id}/steps`               |                                                               | Tableau d'objets `StepResponse`                                          | 200, 401, 403, 404       | Lister toutes les étapes d'un parcours spécifique       |
| **GET**    | `/api/tracks/{trackId}/steps/{stepId}` |                                                               | Objet `StepResponse`                                                     | 200, 401, 403, 404       | Récupérer une étape spécifique d'un parcours spécifique |
| **POST**   | `/api/tracks/{id}/steps`               | Objet `StepRequest`                                           | Objet `StepResponse`                                                     | 201, 400, 401, 403       | Créer une étape pour un parcours spécifique             |
| **PUT**    | `/api/tracks/{id}/steps/{stepId}`      | Objet `StepRequest`                                           | objet `StepResponse`                                                     | 200, 400, 401, 403, 404  | Modifier une étape pour un parcours spécifique          |
| **DELETE** | `/api/tracks/{id}/steps/{stepId}`      |                                                               |                                                                          | 204, 400, 401, 403, 404  | Supprimer une étape pour un parcours spécifique         |
| **GET**    | `/api/users`                           |                                                               | Tableau d'objets `UserResponse`                                          | 200, 401, 403, 404       | Lister tous les utilisateurs                            |
| **GET**    | `/api/users/{id}`                      |                                                               | Objet `UserResponse`                                                     | 200, 401, 403, 404       | Récupérer un utilisateur spécifique                     |
| **POST**   | `/api/users`                           | Objet `UserRequest`                                           | Objet `UserResponse`                                                     | 201, 400, 401, 403       | Créer un nouvel utilisateur                             |
| **PUT**    | `/api/users/{id}`                      | Objet `UserRequest`                                           | Objet `UserResponse`                                                     | 200, 400, 401, 403, 404  | Modifier un utilisateur                                 |
| **DELETE** | `/api/users/{id}`                      |                                                               |                                                                          | 204, 400, 401, 403, 404  | Supprimer un utilisateur                                |
| **GET**    | `/api/places`                          |                                                               | Tableau d'objets `PlaceResponse`                                         | 200, 401, 403, 404       | Lister tous les lieux                                   |
| **GET**    | `/api/places/{id}`                     |                                                               | Objet `PlaceResponse`                                                    | 200, 401, 403, 404       | Récupérer un lieux spécifique                           |
| **POST**   | `/api/places`                          | Objet `PlaceRequest`                                          | Objet `PlaceResponse`                                                    | 201, 400, 401, 403       | Créer un parcours                                       |
| **PUT**    | `/api/places/{id}`                     | Objet `PlaceRequest`                                          | Objet `PlaceResponse`                                                    | 200, 400, 401, 403, 404  | Modifier un parcours                                    |
| **DELETE** | `/api/places/{id}`                     |                                                               |                                                                          | 204, 400, 401, 403, 404  | Supprimer un parcours                                   |
| **GET**    | `/api/users/{id}/favorites`            |                                                               | `{"user_id": int, "track_id": int, "created_at": timestamp }`            | 200, 401, 403, 404       | Lister les parcours favoris d'un utilisateur            |
| **POST**   | `/api/users/{id}/favorites`            | `{"track_id": int}`                                           | `{"user_id": int, "track_id": int, "created_at": timestamp }`            | 201, 400, 401, 403       | Ajouter un parcours en favori                           |
| **DELETE** | `/api/users/{id}/favorites/{trackId}`  |                                                               |                                                                          | 204, 400, 401, 403, 404  | Supprimer un parcours des favoris                       | 

## Objets

### Objet Track
`TrackRequest`
```
TrackRequest {
  title: string
  photo: string
  duration: int
  distance: number
  difficulty: string
  presentation: string
  is_published: boolean
  id_theme: int
}

```
`TrackResponse`
```
TrackResponse {
  id: int
  title: string
  photo: string
  duration: int
  distance: number
  difficulty: string
  presentation: string
  is_published: boolean
  created_at: timestamp
  updated_at: timestamp
  id_theme: int
  user_id: int
}
```

### Objet Step
`StepRequest`
```
StepRequest {
name: string
photo: string
advice: string
anecdote: string
step_order: int
place_id: int
}
```

`StepResponse`
```
StepResponse {
  id: int
  name: string
  photo: string
  advice: string
  anecdote: string
  step_order: int
  created_at: timestamp
  updated_at: timestamp
  place_id: int
  track_id: int
}
```

### Objet User
`UserRequest`
```
UserRequest {
  email: string
  username: string
  password: string
  avatar: string
  is_active: boolean
  id_role: int
}
```
`UserResponse`
```
UserResponse {
  id: int
  email: string
  username: string
  password: string
  avatar: string
  is_active: boolean
  created_at: timestamp
  updated_at: timestamp
  id_role: int
}
```

### Objet Place
`PlaceRequest`
```
PlaceRequest {
  name: string
  photo: string
  city: string
  description: string
  latitude: number
  longitude: number
  id_department: int
}
```
`PlaceResponse`
```
PlaceResponse {
  id: int
  name: string
  photo: string
  city: string
  description: string
  latitude: number
  longitude: number
  created_at: timestamp
  updated_at: timestamp
  id_department: int
}
```


## API Routes

### Authentification et autorisation

Toutes les routes relatives aux ressources doivent être protégées par une autorisation.
Le token d’authentification est transmis par le front-end dans l’en-tête HTTP :

```markdown
Authorization: Bearer <token>
```

Avant toute modification ou suppression d’une ressource, le serveur doit vérifier que l’identifiant de l’utilisateur actuellement authentifié correspond à l’identifiant du propriétaire de la ressource.
Si les identifiants ne correspondent pas, la requête doit être rejetée avec une réponse :

```markdown
[401] : [Authentification requise]
[403] : [Accès interdit – l’utilisateur authentifié n’est pas propriétaire de la ressource]
[404] : [Ressource introuvable ou non accessible]
```

Cette vérification garantit que seul le propriétaire légitime d’une ressource est autorisé à la modifier ou la supprimer.

### Routes publiques

- POST `/api/login` -> Authentifier un utilisateur et renvoyer un token JWT
- POST `/api/signup` -> Créer un nouvel utilisateur
- GET `/api/tracks` -> Lister tous les parcours
- GET `/api/tracks/{id}` -> Récupérer un parcours spécifique
- GET `/api/tracks/{id}/steps` -> Lister toutes les étapes d'un parcours spécifique
- GET `/api/tracks/{trackId}/steps/{stepId}` -> Récupérer une étape spécifique d'un parcours spécifique

### Routes protégées

- POST `/api/tracks` -> Créer un parcours
- GET `/api/users/{id}/favorites` -> Lister les parcours favoris d'un utilisateur
- POST `/api/users/{id}/favorites` -> Ajouter un parcours en favori

**Réservées aux admins**
- GET `/api/users` -> Lister tous les utilisateurs
- GET `/api/users/{id}` -> Récupérer un utilisateur spécifique
- POST `/api/users` -> Ajouter un utilisateur
- GET `/api/places` → Lister tous les lieux
- GET `/api/places/{id}` -> Récupérer un lieu spécifique
- POST `/api/places` -> Ajouter un lieu
- PUT `/api/places/{id}` -> Modifier un lieu
- DELETE `/api/places/{id}` -> Supprimer un lieu

### Routes avec vérification de propriété

Les routes suivantes nécessitent que l’utilisateur soit le créateur de la ressource concernée :

- PUT `/api/tracks/{id}` -> Modifier un parcours
- DELETE `/api/tracks/{id}` -> Supprimer un parcours
- POST `/api/tracks/{id}/steps` -> Ajouter une étape à un parcours spécifique
- PUT `/api/tracks/{id}/steps/{stepId}` -> Modifier une étape d'un parcours spécifique
- DELETE `/api/tracks/{id}/steps/{stepId}` -> Supprimer une étape d'un parcours spécifique
- PUT `/api/users/{id}` -> Modifier un utilisateur
- DELETE `/api/users/{id}` -> Supprimer un utilisateur
- DELETE `/api/users/{id}/favorites/{trackId}` -> Supprimer un parcours des favoris


**Version :** 1.0.0  
**Date :** 01 janvier 2026