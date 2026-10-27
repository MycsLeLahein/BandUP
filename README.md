# BANDUP — entraînement haut du corps aux bandes élastiques

Application web autonome pour débutant : trois programmes de musculation du haut du corps avec les cinq bandes élastiques en boucle du set (jaune, rouge, noire, violette, verte).

## Ouvrir l’application

1. Garde **tout le dossier** ensemble (`index.html`, `styles.css`, `app.js` et `assets/gifs`).
2. Double-clique sur **`index.html`**.
3. L’app fonctionne hors ligne, sans installation ni serveur.

> Si tu déplaces l’application, déplace le dossier complet : les GIFs sont stockés dans `assets/gifs`.

## Les programmes

| Onglet | Rythme | Format | Jours d’entraînement |
|---|---|---|---|
| **15 min** | 4 jours / 7 | 5 exercices en circuit, 2 tours, 40 s d’effort / 20 s de repos | Lun · Mer · Ven · Sam |
| **30 min** | 4 jours / 7 | Blocs force + volume + finition gainage | Lun · Mer · Ven · Sam |
| **60 min** | 4 jours / 7 | Split push / pull, 3 séries par exercice, repos longs | Lun · Mer · Ven · Sam |

Les jours de repos sont **mardi, jeudi et dimanche**.

### Répartition des séances

- **15 min** : Base · Dos · Équilibre · Bras & gainage
- **30 min** : Push · Pull · Full haut · Bras & gainage
- **60 min** : Push A · Pull A · Push B · Pull B

Le programme de 60 minutes est ambitieux pour un vrai débutant : commence par **2 séances par semaine** (lundi et mercredi) pendant les deux premières semaines, puis ajoute les deux autres si tu récupères bien.

## Fonctionnalités

- **Un GIF animé par exercice**, avec le muscle ciblé et le matériel requis.
- **Fiche technique** pour chaque mouvement : 3 consignes, erreur à éviter, conseil, bande recommandée.
- **Minuteur de repos** intégré (20 s, 45 s, 60 s ou 75 s selon l’exercice).
- **Suivi de progression** : coche les exercices, la progression est sauvegardée dans le navigateur (`localStorage`).
- **Guide des cinq bandes** : correspondances livres / kilos, choix de la résistance, progression et règles de sécurité.
- **Responsive** : téléphone, tablette et ordinateur.
- **Aucune dépendance externe**, aucun compte, aucune connexion.

## Sécurité

- Inspecte la bande avant chaque séance.
- Ancre-la à un point fixe et solide ; teste la tension doucement.
- Ne l’étire pas au-delà de trois fois sa longueur et ne la relâche jamais d’un coup.
- En cas de douleur vive, de vertige ou d’essoufflement anormal : arrête et consulte un professionnel de santé.

Ce contenu est éducatif et ne remplace pas un avis médical.

## Structure

```
index.html          interface
styles.css          mise en page responsive
app.js              programmes, exercices, interactions, minuteur
assets/gifs/        21 démonstrations animées
README.md
```

## Crédits

- Démonstrations animées : [exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset), médias © [Gym visual](https://gymvisual.com/), utilisés à des fins éducatives avec attribution.
- Les niveaux de résistance (lb / kg) reprennent les indications du set de cinq bandes fourni.
