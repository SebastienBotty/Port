import { ProjectType } from "../Typescript/Types";

export const tOu: ProjectType = {
  projectName: {
    EN: `Tou`,
    FR: `Tou`,
  },
  description: {
    EN: `Private mobile application to easily find my friend when we go out`,
    FR: `Application mobile privée permettant d'avoir la position de mes amis quand on sort.`,
  },
  stack: [
    `TypeScript`,
    `ReactNative`,
    `MongoDB`,
    `Express`,
    `AWS: S3`,
    `Firebase: Auth`,
    `Socket.io`,
  ],
  link: ``,
  image: `/images/Tou-image.png`,
  features: [
    {
      title: {
        EN: `User's localisation tracking`,
        FR: `Suivi de la localisation`,
      },
      description: {
        EN: `**Real-time location sharing** is the core feature of this application.

Once user is connected, he must grant access to his location. Then, he sends his location every 5 meters to all users. 

His location is updated on everyone's map and, distance between user and him is also recalculated. 

This feature works in the background, ensuring continuous tracking while minimizing battery usage.

TO DO ? Add altitude to know if user are on the same floor or not.`,
        FR: `**Le partage de position en temps réel** est la fonctionnalité principale de cette application.

Une fois connecté, l'utilisateur doit donner l'accès à sa localisation. Par après, et tous les 5 mètres, elle est envoyée à tous les utilisateurs. 

Sa position est mise à jour sur la carte de tout le monde, la distance entre lui et l'utilisateur est aussi recalculée.

A FAIRE? Rajouter l'altitude pour savoir si les personnes se situent au même étage d'un batiment.

Cette fonctionnalité fonctionne en arrière-plan, assurant un suivi continu tout en minimisant l'utilisation de la batterie.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Add a marker`,
        FR: `Ajout d'un point de repère sur la carte`,
      },
      description: {
        EN: `**Creating meeting points** helps coordinate gatherings in specific locations.

The user can create a marker at their location by clicking on the cross in the top-left corner or by long-pressing at a specific location on the map. A modal appears allowing them to give a name, a color, and a photo to the marker. 

Users with the app open will receive a toast notification informing them of the creation of a new marker, facilitating real-time coordination.`,
        FR: `**La création de points de rencontre** aide à coordonner les rassemblements à des endroits spécifiques.

L'utilisateur peut créer un point de repère sur sa position en cliquant sur la croix dans le coin supérieur gauche ou bien à un endroit précis sur la carte en faisant une longue pression en ce lieu. Un modal apparaît lui permettant de donner un nom, une couleur ainsi qu'une photo à ce point de repère.

Les utilisateurs ayant l'app ouverte reçoivent un toast les notifiant de la création d'un point de repère, facilitant la coordination en temps réel.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Delete a marker`,
        FR: `Suppression d'un point de repère`,
      },
      description: {
        EN: `**Managing meeting points** includes the ability to remove outdated or incorrect markers.

The creator of a marker and the admin (myself) can delete the marker. This helps keep the map clean and relevant.

When a marker is deleted, other users are notified to prevent confusion.`,
        FR: `**La gestion des points de rencontre** inclut la possibilité de supprimer des marqueurs obsolètes ou incorrects.

Le créateur d'un point de repère ainsi que l'admin (moi) peut supprimer son point. Cela aide à garder la carte propre et pertinente.

Lorsqu'un marqueur est supprimé, les autres utilisateurs sont notifiés pour éviter toute confusion.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Tell all users I'm heading to a marker`,
        FR: `Avertir les utilisateurs que je me dirige vers un point de repère`,
      },
      description: {
        EN: `**Coordinating movements** is essential for efficient meetups.

The user can click the 'I'm arriving' button on a marker. This sends a notification to the phones of people also heading to that marker, while displaying a toast to other users if they have the app open at that moment.

It draws a color line of the destination color between user and his destination on the map. Impossible to do if there's less than 10m between users and his destination.`,
        FR: `**La coordination des déplacements** est essentielle pour des rencontres efficaces.

L'utilisateur peut cliquer sur le bouton "J'arrive" d'un point de repère. Cela envoie une notification sur le téléphone des personnes se dirigeant aussi vers ce point, tandis que cela affiche un toast aux autres utilisateurs s'ils sont sur l'app à ce moment.

Cela crée une ligne de la couleur du point de destination entre l'utilisateur et la destination sur la carte. Impossible à effectuer si l'utilisateur se trouve à moins de 10m du lieu en question.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Tell a user I'm joining him`,
        FR: `Avertir un utilisateur que je me dirige vers lui`,
      },
      description: {
        EN: `**Person-to-person coordination** allows users to connect directly.

The user can click the 'On my way' button on a user. This sends a notification to this user's phone, while displaying a toast to other users if they have the app open at that moment.

This feature facilitates direct meetups between individuals. Impossible to do if there's less than 10m between both users.`,
        FR: `**La coordination personne à personne** permet aux utilisateurs de se connecter directement.

L'utilisateur peut cliquer sur le bouton "J'arrive" d'un utilisateur. Cela lui envoie une notification sur son téléphone, tandis que cela affiche un toast aux autres utilisateurs s'ils sont sur l'app à ce moment.

Cette fonctionnalité facilite les rencontres directes entre individus. Impossible à effectuer si l'utilisateur se trouve à moins de 10m de l'utilisateur cible.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Tell all users I want a gathering on a marker`,
        FR: `Demande un rassemblement à un repère`,
      },
      description: {
        EN: `**Organizing group gatherings** at specific locations improves coordination.

The user can click the 'Regroup' button on a marker. This sends a notification to all users' phones. The button has a 30-second cooldown before it can be used again. The user is flagged as "on his way to this marker".

The notification includes two buttons:
- 'I'm arriving': Notifies the sender that the person is on their way
- 'Ignore': Does nothing

If the user taps on the notification itself instead of a button, it opens the app and centers the map on the marker.`,
        FR: `**L'organisation de rassemblements de groupe** à des endroits spécifiques améliore la coordination.

L'utilisateur peut cliquer sur le bouton "regroupement" d'un point de repère. Cela envoie une notification aux téléphones de tous les utilisateurs. L'utilisateur est flagué comme "en direction de ce marker". Ce bouton a un temps d'attente de 30 secondes avant réutilisation.

Sur cette notification se trouvent 2 boutons :
- "J'arrive" : Envoie une notification à l'utilisateur expéditeur lui avertissant que la personne arrive
- "Ignorer" : Ne fait rien

Si au lieu d'appuyer sur un des boutons, l'utilisateur appuie sur la notification, cela lui ouvre son application et centre la carte sur le point de repère.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Tell all users I want a gathering on me`,
        FR: `Demander un rassemblement sur ma position`,
      },
      description: {
        EN: `**Becoming a meeting point** allows a user to gather others at their location.

The user can click his 'Regroup' button. This sends a notification to all users' phones. The button has a 30-second cooldown before it can be used again.

The notification includes two interactive options:
- 'I'm arriving': Notifies the sender that the person is on their way
- 'Ignore': Does nothing

If the user taps on the notification itself instead of a button, it opens the app and centers the map on the sender's position.`,
        FR: `**Devenir un point de rencontre** permet à un utilisateur de rassembler d'autres personnes à sa position.

L'utilisateur peut cliquer sur son bouton "regroupement". Cela envoie une notification aux téléphones de tous les utilisateurs. Ce bouton a un temps d'attente de 30 secondes avant réutilisation.

Sur cette notification se trouvent 2 options interactives :
- "J'arrive" : Envoie une notification à l'utilisateur expéditeur lui avertissant que la personne arrive
- "Ignorer" : Ne fait rien

Si au lieu d'appuyer sur un des boutons, l'utilisateur appuie sur la notification, cela lui ouvre son application et centre la carte sur la position de l'utilisateur expéditeur.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Tell users I've arrived to my destination`,
        FR: `Avertir les utilisateurs que je suis arrivé à ma destination`,
      },
      description: {
        EN: `**Arrival notifications** complete the movement tracking cycle.

When a user announces they're heading toward a marker or a person and they arrive at their destination, the people going to the same place — or the person who requested the regroup — are notified via a notification.

This feature helps everyone keep track of who has already arrived at the meeting point.`,
        FR: `**Les notifications d'arrivée** complètent le cycle de suivi des mouvements.

Quand un utilisateur annonce qu'il se dirige vers un point/une personne et qu'il arrive à sa destination, les personnes se dirigeant au même endroit/la personne ayant demandé le regroupement sont averties via une notification.

Cette fonctionnalité aide tout le monde à suivre qui est déjà arrivé au point de rencontre.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `[Admin] Disable a user account`,
        FR: `[Admin] Désactiver le compte d'un utilisateur`,
      },
      description: {
        EN: `**Administrative control** ensures security and proper usage of the application.

An admin panel is accessible only from my account. It allows me to authorize or deactivate a user account from using the app.

When an account is deactivated:
- A screen appears informing the user
- They can no longer see or do anything within the app
- Their location is no longer shared with others`,
        FR: `**Le contrôle administratif** assure la sécurité et l'utilisation appropriée de l'application.

Un panel admin est accessible uniquement pour mon compte. Celui-ci me permet d'autoriser ou de désactiver un compte à utiliser l'application.

Quand un compte est désactivé :
- Un écran informant l'utilisateur apparaît
- Il ne peut plus rien voir/faire avec l'app
- Sa position n'est plus partagée avec les autres`,
      },
      image: ``,
    },
    {
      title: {
        EN: `[Admin] Create a user account`,
        FR: `[Admin] Créer un compte à un utilisateur`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `History`,
        FR: `Historique`,
      },
      description: {
        EN: `**Event tracking** provides users with context of past activities.

A history of all events up to 48 hours ago is available. This includes:
- Marker creations and deletions
- User movements and announcements
- Gathering requests and responses
- User connections and disconnections

This feature helps users understand what happened when they weren't using the app.`,
        FR: `**Le suivi des événements** fournit aux utilisateurs le contexte des activités passées.

Un historique de tous les évènements jusqu'à 48h en arrière est disponible. Cela inclut :
- Les créations et suppressions de marqueurs
- Les mouvements et annonces des utilisateurs
- Les demandes de rassemblement et les réponses
- Les connexions et déconnexions des utilisateurs

Cette fonctionnalité aide les utilisateurs à comprendre ce qui s'est passé lorsqu'ils n'utilisaient pas l'application.`,
      },
      image: ``,
    },
  ],
};

export const notMessenger: ProjectType = {
  projectName: {
    EN: `Not-messenger`,
    FR: `Not-messenger`,
  },
  description: {
    EN: `Messenger clone (web) with most of its features.`,
    FR: `Clone de Messenger (web) avec la plupart de ses fonctionnalités`,
  },
  stack: [`TypeScript`, `React`, `MongoDB`, `Express`, `AWS: S3`, `Firebase: Auth`, `Socket.io`],
  link: ``,
  image: `/images/notMessenger-image.png`,
  features: [
    {
      title: {
        EN: `Send message`,
        FR: `Envoyer un message`,
      },
      description: {
        EN: `**The user can send a message** to other users.

            It will be added to the conversation's message list.`,
        FR: `**L'utilisateur peut envoyer un message** à d'autres utilisateurs.

            Celui-ci sera ajouté à la liste des messages de la conversation`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Create conversations`,
        FR: `Création de conversation`,
      },
      description: {
        EN: `**The user can search for other users by username and create a conversation with them.**

            Details:
            - If they try to create a private conversation with someone they already have one with, instead of creating a new one, the existing conversation will be shown and the message will be sent there.
            - They cannot add someone they have blocked.
            - They cannot add someone who is already in the add list.
            - If the user adds only one person, the conversation is considered "private", and both users will have admin rights.`,
        FR: `**L'utilisateur peut rechercher des utilisateurs par le pseudo et créer une conversation avec.** 

            Particularités:
            - S'il veut créer une conversation privée avec une personne alors qu'il en a déja une existante, au lieu de créer la conversation, cela affichera la conversation existante et enverra le message dedans
            - Ne peut pas rajouter une peronne qu'il a bloquée
            - Ne peut pas rajouter quelqu'un étant déja dans la liste d'ajout
            - Si l'utilisateur ne rajoute qu'une personne, la conversation est considérée comme "privée", ils auront donc tous les deux les droits admin.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Block user`,
        FR: `Bloquer un utilisateur`,
      },
      description: {
        EN: `**Blocking a user** prevents you from seeing messages they send.

            If there's an existing private conversation with that person, it will no longer appear among the regular conversations and will instead be moved to the "Blocked Users" tab. 
            In that conversation, messages sent before the block will still be visible, but any messages sent afterward will not. The same applies to group conversations that include the blocked person. 
            Once the person is unblocked, all messages become visible again.`,

        FR: `**Bloquer un utilisateur** permet de ne plus voir les messages que cette personne envoie.

            S'il existe une conversation privée avec cette personne, celle-ci sera ne sera plus affichée parmis les conversations, elle sera dans l'onglet "utilisateurs bloqués". 
            Dans cette conversation, les messages précédents le blocage seront toujours visibles mais tout messages ultérieurs ne seront plus visible. 
            De même dans les conversations de groupe dans lesquelles se trouvent la personne bloquée. Une fois la perosnne débloquée, tous les messages seront à nouveai visible.
            `,
      },
      image: ``,
    },
    {
      title: {
        EN: `Add/remove user of a group conversation`,
        FR: `Ajouter/Retirer un utilisateur d'une conversation de groupe`,
      },
      description: {
        EN: `Only in group conversations (non-private), users can be added or removed.

            **Adding** :
            
            A modal allows searching for users to add.
            
              - Only admins can do this
              - Search is done by username
              - A temporary "currently adding" list lets you quickly remove users before finalizing the addition
              - You cannot search for someone already in the conversation
            
            **Removing** :
            
              - Only admins can do this
              - Admins cannot be removed (their admin rights must first be revoked — only the conversation creator or the oldest remaining admin can do this)
              - The creator (or oldest admin) cannot be removed
              
              A system message will be displayed to inform all users in the conversation of this change.`,

        FR: `Uniquement dans une conversation de groupe (non privée), il y a la possibilité d'ajouter/retirer d'autres utilisateurs.
            
  **Ajout** :  
  Un modal permet de rechercher les utilisateurs à ajouter

    - Seul les admins peuvent le faire
    - Recherche par le pseudo
    - Liste de personnes "en train d'être ajoutées" à partir de laquelle on peut rapidement les retirer si on ne souhaite plus les ajouter 
    - Impossible de chercher une personne déja présente dans la conversation

  **Retirer** :  
  - Seul les admins peuvent le faire
  - Impossible de retirer un admin (il faut d'abord lui retirer les droits admins, seul le créateur de la conversation peut le faire (ou l'admin le plus ancien si ce premier a quitté la conversation))
  - Impossible de retirer le créateur (ou admin plus ancien)
  
  Un message système sera affiché pour prévenir tous les utilisateurs de la conversation de ce changement
`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Set/remove user as Admin in a group conversation`,
        FR: `Mettre/retirer un utilisateur admin d'une conversation de groupe`,
      },
      description: {
        EN: `Granting admin rights allows the user to:

- Add or remove members from the conversation

A system message will be displayed to inform all users in the conversation of this change.`,
        FR: `Donner les droits admins permet à l'utilisateur de: 

- Ajouter/retirer des membres de la conversation

Un message système sera affiché pour prévenir tous les utilisateurs de la conversation de ce changement
`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Change group conversation photo`,
        FR: `Changer la photo d'une conversation de groupe`,
      },
      description: {
        EN: `Any user can change the name of a group conversation.

        - Conversations without a name follow the format: 'User1, User2, User3, ...'
        - The conversation name has a maximum of 30 characters
        - To apply the name change, the new name must be different from the current one
        - Leaving the name empty will revert the conversation to the default format mentioned above
        
        A system message will be displayed to inform all users in the conversation of this change.`,
        FR: `Tout utilisateur peut changer le nom d'une conversation de groupe

            - Les conversations sans nom respectent le format : 'utilisateur1, Utilisateur2, Utilisateur3, ..."
            - Le nom d'une conversation est de max 30 caractères
            - Pour valider le changement de nom, il faut que le nouveau nom soit différent nom du nom actuel
            - Mettre un nom vide revient à afficher la conversation sous le format de base cité plus haut
            
             Un message système sera affiché pour prévenir tous les utilisateurs de la conversation de ce changement
`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Change conversation emoji`,
        FR: `Changer l'emoji d'une conversation`,
      },
      description: {
        EN: `Any user can change the conversation's emoji.

            The conversation emoji acts as a quick reaction that users can tap to instantly send a message containing that emoji.  
            They can choose this emoji from a list of suggested emojis.
            
            A system message will be displayed to inform all users in the conversation of this change.`,
        FR: `Tout utilisateur peut changer l'emoji d'une conversation.

            L'emoji d'une conversation est une réaction rapide sur laquelle l'utilisateur peut appuyer pour directement envoyer un message contenant cet emoji.  
            Il peut choisir cet emoji parmis une liste d'ememojis.

            Un message système sera affiché pour prévenir tous les utilisateurs de la conversation de ce changement.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Change conversation color theme`,
        FR: `Changer le theme couleur d'une conversation`,
      },
      description: {
        EN: `Any user can change the conversation's theme color. This only changes the color of the messages sent by that user.  
 Depending on whether the chosen color is light or dark, the text color will automatically switch between black and white.`,
        FR: `Tout utilisateur peut changer le thème couleur de la conversation. Cela change uniquement la couleur des messages envoyés par l'utilisateur.  
En fonction de si la couleur choisie est claire ou foncée, le couleur de la police passe de blanc à noir.
`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Change conversation members nicknames`,
        FR: `Changer les pseudos des membres de la conversation`,
      },
      description: {
        EN: `Any user can change the nicknames of the members in the conversation.  
Each time a user's name is displayed in the conversation — for example, as the author of a message or in a system message —  
their nickname will be shown instead.`,
        FR: `Tout utilisateur peut changer les pseudos des membres de la conversations.  
Chaque fois que le nom d'un utilisateur sera utilisé dans la conversation. Ex: Auteur de message, message système...  
Son pseudo sera affiché à la place.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Send file/image/video in a conversation`,
        FR: `Envoyer une fichier/image/vidéo dans une conversation`,
      },
      description: {
        EN: `The user can send any type of file in the conversation.

- Files can be added either by clicking the button or by drag & drop
- Each file must not exceed 20MB
- File names cannot contain commas or hyphens
- It's not possible to send the same file multiple times at once

File preview:

- Displays a preview of the files to be sent, with the option to remove them before sending
- Files are shown as an icon with their filename underneath
- Images and videos are directly visible`,
        FR: `L'utiisateur peut envoyer tout type de fichiers dans la conversation.

- Possibilité d'ajouter les fichiers en cliquant sur le bouton ou en drag & drop
- Les fichiers ne peuvent pas faire plus de 20Mb par fichier
- Le nom du fichier ne peut pas contenir de virgule ni de tiret 
- Impossible d'envoyer plusieurs fois le même fichier en même temps

Preview des fichiers:

- Affiche une preview des différents fichiers à envoyer, possibilité de les retirer avant l'envoi
- Les fichiers sont représentés par une image de fichier avec leur noms en-dessous
- Les images et vidéos sont directement visibles`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Search a message in a conversation`,
        FR: `Chercher un message dans une conversation`,
      },
      description: {
        EN: `The user can search for a string of at least 3 characters within a conversation.  
It returns all messages containing that string  
**Except**:

- If the user has deleted the conversation, messages prior to the deletion date
- Messages the user has deleted for themselves (but still visible to others)
- Messages deleted by the author (deleted for everyone and replaced with "This message was deleted")
- If the user left or was removed from the conversation, messages sent after that date

**Clicking on one of the messages in the search results**:  
If the message is already loaded, the view scrolls to it. Otherwise, the message is fetched along with around ten messages before and after.  

The target message is highlighted.`,
        FR: `L'utilisateur peut rechercher une chaine de minimum 3 caractères  dans une conversation  
Lui retourne tous les messages contenants cette chaine  
**Excepté**

- S'il a supprimé la conversation, les messages précédents la date de suppression
- Les messages qu'il aurait supprimé pour lui-même (mais toujours visible par les autres)
- Les messages supprimés par l'auteur (supprimé pour tout le monde et remplacé par "Ce message a été supprimé")
- S'il a quitté/été exclu d'une conversation, les messages suivants cette date

**Cliquer sur un des messages de la liste contenant la chaine de craratère** :  
Si le message est déja chargé, scroll jusqu'au message, autrement, charge le message en question ainsi qu'une dizaine de messages avant et après celui-ci

Le message en question est mis en évidence.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Mute/unmute a conversation`,
        FR: `Mettre une conversation en sourdine`,
      },
      description: {
        EN: `The user can mute a conversation for various durations or indefinitely until they change it.  
        Muting the conversation prevents the notification sound from playing when a new message is received.`,
        FR: `L'utilisateur peut mettre une conversation en sourdine pendant différentes durées ou indéfiniment jusqu'à ce qu'il le change.  
Mettre la conversation en sourdine empêche de jouer le son de notification lors d'un nouveau message`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Delete a conversation`,
        FR: `Supprimer une conversation`,
      },
      description: {
        EN: `The user can delete a conversation, which removes it from their conversation list and hides everything prior to that moment.  
As soon as a new message is sent in the conversation, it will reappear in the list.  
Previous messages, photos, and files will no longer be accessible to the user but will still be available to other participants.  
It will also no longer be possible to search for messages sent before that moment.`,
        FR: `L'utilisateur peut supprimer une conversation, cela permet de la retirer de sa liste de conversations et de ne plus rien voir précédent ce moment.  
Dès qu'un nouveau message sera envoyé dans cette conversation, elle réapparaitra dans la liste.  
Les anciens messages, photos et fichiers ne seront plus accessibles par l'utilisateur mais le seront toujours pour les autres participants.  
Il ne sera plus possible non plus de rechercher des messages précédents ce moment.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Transfer an image/video from a conversation to another`,
        FR: `Transferer une image/video d'une conversation à une autre`,
      },
      description: {
        EN: `When the user is in the image viewer, they can forward the image to another conversation using a button.  
In the modal, their 5 most recent conversations are suggested.  
They can also search among their conversations by typing a user's name or the name of a conversation.`,
        FR: `Quand l'utilisateur est dans le visualiseur d'image, il peut la transférer dans une autre conversation via un bouton.  
Dans ce modal, ses 5 conversations les plus récentes lui sont directement proposées.  
Il peut aussi rechercher parmis ses conversations en tapant le nom d'un utilisateur ou bien le nom d'une conversation`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Edit a message`,
        FR: `Modifier un message`,
      },
      description: {
        EN: `The author of a message can edit it even after 10 minutes have passed since it was sent.  
When a message is edited, a "Edited" label appears just above the message.  
Clicking on it allows users to view the message’s edit history.`,
        FR: `L'auteur d'un message peut modifier un message qu'il a envoyé en dela des 10 minutes après l'avoir envoyé.  
Quand un message est modifié, une mention "Modifié" est affiché juste au-dessus du dit-message.  
En cliquant dessus, il est possible de voir les différentes modifications effectuées.`,
      },
      image: ``,
    },

    {
      title: {
        EN: `Delete a message`,
        FR: `Supprimer un message`,
      },
      description: {
        EN: `**Delete a message for yourself**

The user can delete any message *for themselves*, meaning only they will no longer see it or be able to search for it.  
If the deleted message was the last one in the conversation, the conversation preview will display the previous message instead.

**Delete a message for everyone**

Only the author of a message can perform this action.  
The content will be replaced with "This message was deleted", and no one will be able to view or search the original message anymore.  
If the deleted message was the last one in the conversation, the preview will also display "This message was deleted".

Both actions are irreversible.`,
        FR: `**Supprimer un message pour soi**

L'utilisateur peut suprpimer n'importe quel message "pour lui", il sera le seul à ne plus voir ce message, il ne pourra plus le chercher non plus.
Si ce message est le dernier de la conversation, dans la liste des conversations, le dernier message sera remplacé par le message précédent.

**Supprimer un message pour tout le monde**

Seul l'auteur d'un message peut le faire.  
Le texte de ce message sera remplacé par "Ce message a été supprimé", plus personne ne pourra ni voir ni rechercher le texte original de ce message.  
Si ce message est le dernier de la conversation, dans la liste des conversations, le texte sera aussi remplacé par "Ce message a été supprimé".

Ces deux actions sont irréversibles`,
      },
      image: ``,
    },
    {
      title: {
        EN: `React to a message with an emoji`,
        FR: `Réagir à un message avec un emoji`,
      },
      description: {
        EN: `Users can react to any message with an emoji.  
Five default emojis are suggested, but more can be accessed by clicking the "+" button.  
Reactions are displayed below the message.

Clicking on the reactions opens a list showing who reacted with what.

Users can remove their reaction either by clicking the same emoji again in the selection menu or by clicking their emoji in the reaction list.`,
        FR: `L'utilisateur peut réagir à n'importe quel message avec un emoji.  
Cinq émojis de base lui sont proposés, mais plus sont accessibles en appuyant sur le "+".  
La réaction à ce message est visible en dessous de celui-ci.

En cliquant sur les différentes réactions du message, la liste complète s'affiche, montrant la réaction de chaque personne.

Il est possible de retirer sa réaction en recliquant sur l'emoji dans le menu ou dans la liste des personnes ayant réagi.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Get all files of a conversation`,
        FR: `Voir tous les fichiers d'une conversation`,
      },
      description: {
        EN: `By going into the conversation details, the user can view and download all files that were sent, except those sent after they left the conversation.`,
        FR: `En allant dans les détails de la conversation, l'utilisateur peut voir et télécharger tous les fichiers envoyés, excepté ceux envoyés après qu'il a quitté la conversation.`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Get all images`,
        FR: `Voir toutes les images d'une conversation`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

L'utilisateur peut accéder aux 
Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Get elder messages`,
        FR: `Voir des messages plus anciens`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Signup/Signin`,
        FR: `Inscription/connexion`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Change online status`,
        FR: `Changer le statut en ligne`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Change profile picture`,
        FR: `Changer la photo de profil`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Leave a group conversation`,
        FR: `Quitter une conversation de groupe`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Being notified a user is typing`,
        FR: `Voir quand un utilisateur est en train d'écrire`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `See who has seen a message`,
        FR: `Voir qui a vu un message`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Send a GIF dans une conversation`,
        FR: `Envoyer un GIF dans une conversation`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
    {
      title: {
        EN: `Signup/Signin`,
        FR: `Inscription/connexion`,
      },
      description: {
        EN: `**Controlled user access** maintains the private nature of this application.

An admin panel is accessible only from my account, and it's the only way to create a new user account. This ensures that unauthorized users cannot access the app.

This process includes:
- Creating login credentials
- Setting initial permissions
- Adding the user to the system database`,
        FR: `**L'accès utilisateur contrôlé** maintient la nature privée de cette application.

Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app.

Ce processus comprend :
- La création d'identifiants de connexion
- La définition des permissions initiales
- L'ajout de l'utilisateur à la base de données du système`,
      },
      image: ``,
    },
  ],
};

export const portfolio: ProjectType = {
  projectName: {
    EN: `Portfolio`,
    FR: `Portfolio`,
  },
  description: {
    EN: `The portfolio you're currently viewing - a showcase of my projects`,
    FR: `Le portfolio que vous regardez actuellement - vitrine de mes projets`,
  },
  stack: [`TypeScript`, `React`, `Sass`],
  link: ``,
  image: `/images/portfolio-image.png`,
  features: [],
};

export const projectsContainerText = {
  title: {
    EN: `Projects`,
    FR: `Projets`,
  },
};

export const projectsArr: ProjectType[] = [tOu, notMessenger, portfolio];
