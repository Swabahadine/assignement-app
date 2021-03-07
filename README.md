

# assignement-app
## 1- Les roles
3 roles sont définies:

 - ADMIN
 - TEACHER
 - USER (élève)
## 2 - Gestion login
### 2.1 Connection 
On peut se connecter à l'aide d'identifiants : **username** et **password**
### 2.2 Inscription 
Pour s'inscrire il faut : **username** , **password** et **role**
## 3 - Les droits
### 3.1 - ADMIN
- Il peut lire tous les Assignments de la base. 
- Crée de nouvelle matières en fonction des professeur inscrits
### 3.2 - USER
- Il peut lire uniquement les Assignments qu'il a lui même créé, jamais celui d'un autre user.
- Il peut **créer** des Assignments en choisissant une matière.
### 3.3 - TEACHER
- Il peut lire uniquement les Assignments affecté à sa matière, jamais ceux d'une autre matière. 
- Il peut **noter** des Assignments de sa matières en donnant une note et un commentaire (facultatif).

### 4 - Points forts
- API bien sécurisée: (erreur 500 très difficile à réaliser)
- Application stable, gestion d'erreurs poussée
- 3 rôles manipulés, l'interface s'adapte en fonction du rôle de l'utilisateur sans problème. 

### 5 - Points faibles: les fonctionnalités restantes
- image du professeur
- image de la matière
- suppression assignments (uniquement coté front, réalisé coté api)
- suppresion matières (uniquement coté front, réalisé coté api)
- modification assignment (uniquement coté front, réalisé coté api)
- modification matières (uniquement coté front, réalisé coté api)

