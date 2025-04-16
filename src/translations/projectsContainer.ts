import { ProjectType } from "../Typescript/Types";

export const tOu: ProjectType = {
  projectName: {
    EN: "Tou",
    FR: "Tou",
  },
  description: {
    EN: "Private mobile application to easily find my friend when we go out",
    FR: "Application mobile privée permettant d'avoir la position de mes amis quand on sort.",
  },
  stack: [
    "TypeScript",
    "ReactNative",
    "MongoDB",
    "Express",
    "AWS: S3",
    "Firebase: Auth",
    "Socket.io",
  ],
  link: "",
  image: "/images/Tou-image.png",
  features: [
    {
      title: {
        EN: "User's localisation tracking",
        FR: "Suivi de la localisation",
      },
      description: {
        EN: "Once user is connected, he must grant access to his location. Then, he sends his location every 5 meters to all users. His location is updated on everyone's map and can be easily located",
        FR: "Une fois connecté, l'utilisateur doit donner l'accès à sa localisation. Par après, et tous les 5 mètres, elle est envoyée à tous les utilisateurs. Sa position est mise à jour sur la carte de tout le monde et peut être facilement trouvée.",
      },
      image: "",
    },
    {
      title: {
        EN: "Add a marker",
        FR: "Ajout d'un point de repère sur la carte",
      },
      description: {
        EN: "The user can create a marker at their location by clicking on the cross in the top-left corner or by long-pressing at a specific location on the map. A modal appears allowing them to give a name, a color, and a photo to the marker. Users with the app open will receive a toast notification informing them of the creation of a new marker",
        FR: "L'utilisateur peut créer un point de repère sur sa position en cliquant sur la croix dans le coin supérieur gauche ou bien à un endroit précis sur la carte en faisant une longue pression en ce lieu. Un modal apparaît lui permettant de donner un nom, une couleur ainsi qu'une photo à ce point de repère. Les utilisateurs ayant l'app ouverte reçoivent un toast les notifiant de la création d'un point de repère",
      },
      image: "",
    },
    {
      title: {
        EN: "Delete a marker",
        FR: "Suppression d'un point de repère",
      },
      description: {
        EN: "The creator of a marker and the admin (myself) can delete the marker.",
        FR: "Le créateur d'un point de repère ainsi que l'admin(moi) peut supprimer son point",
      },
      image: "",
    },
    {
      title: {
        EN: "Tell all users I'm heading to a marker",
        FR: "Avertir les utilisateurs que je me dirige vers un point de repère",
      },
      description: {
        EN: "The user can click the 'I'm arriving' button on a marker. This sends a notification to the phones of people also heading to that marker, while displaying a toast to other users if they have the app open at that moment. It draws a color line of the destination color between user and his destination on the map. Impossible to do if there's less than 10m between users and his destination",
        FR: "L'utilisateur peut cliquer sur le bouton \"J'arrive\" d'un point de repère. Cela envoie une notification sur le téléphone des personnes se dirigeant aussi vers ce point, tandis que cela affiche un toast aux autres utilisateurs s'ils sont sur l'app à ce moment. Cela crée une ligne de la couleur du point de destination entre l'utilisateur et la destination sur la carte. Impossible à effectuer si l'utilisateur se trouve à moins de 10m du lieu en question",
      },
      image: "",
    },
    {
      title: {
        EN: "Tell a user I'm joining him",
        FR: "Avertir un utilisateur que je me dirige vers lui",
      },
      description: {
        EN: "The user can click the 'On my way' button on a user. This sends a notification to this user's phone, while displaying a toast to other users if they have the app open at that moment. Impossible to do if there's less than 10m between both users",
        FR: "L'utilisateur peut cliquer sur le bouton \"J'arrive\" d'un utilisateur. Cela lui envoie une notification sur son téléphone, tandis que cela affiche un toast aux autres utilisateurs s'ils sont sur l'app à ce moment. Impossible à effectuer si l'utilisateur se trouve à moins de 10m de l'utilisateur cible",
      },
      image: "",
    },
    {
      title: {
        EN: "Tell all users I want a gathering on a marker",
        FR: "Avertir les utilisateurs que je veux un rassemblement à un point de repère",
      },
      description: {
        EN: "The user can click the 'Regroup' button on a marker. This sends a notification to all users’ phones. The button has a 30-second cooldown before it can be used again. The user is flagged as \"on his way to this marker\". The notification includes two buttons: 'I'm arriving' and 'Ignore'. The first button notifies the sender that the person is on their way. The other does nothing. If the user taps on the notification itself instead of a button, it opens the app and centers the map on the marker.",
        FR: "L'utilisateur peut cliquer sur le bouton \"regroupement\" d'un point de repère. Cela envoie une notification aux téléphones de tous les utilisateurs. L'utilisateur est flagué comme \"en direction de ce marker\". Ce bouton a un temps d'attente de 30 secondes avant réutilisation. Sur cette notification se trouvent 2 boutons : \"J'arrive\" et \"ignorer\". Le premier bouton envoie une notification à l'utilisateur expéditeur lui avertissant que la personne arrive. L'autre ne fait rien. Si au lieu d'appuyer sur un des boutons, l'utilisateur appuie sur la notification, cela lui ouvre son application et centre la carte sur le point de repère.",
      },
      image: "",
    },
    {
      title: {
        EN: "Tell all users I want a gathering on me",
        FR: "Avertir les utilisateurs que je veux un rassemblement sur ma position",
      },
      description: {
        EN: "The user can click his 'Regroup' button. This sends a notification to all users’ phones. The button has a 30-second cooldown before it can be used again. The notification includes two buttons: 'I'm arriving' and 'Ignore'. The first button notifies the sender that the person is on their way. The other does nothing. If the user taps on the notification itself instead of a button, it opens the app and centers the map on the sender's position.",
        FR: "L'utilisateur peut cliquer sur son bouton \"regroupement\". Cela envoie une notification aux téléphones de tous les utilisateurs. Ce bouton a un temps d'attente de 30 secondes avant réutilisation. Sur cette notification se trouvent 2 boutons : \"J'arrive\" et \"ignorer\". Le premier bouton envoie une notification à l'utilisateur expéditeur lui avertissant que la personne arrive. L'autre ne fait rien. Si au lieu d'appuyer sur un des boutons, l'utilisateur appuie sur la notification, cela lui ouvre son application et centre la carte sur la position de l'utilisateur expéditeur.",
      },
      image: "",
    },
    {
      title: {
        EN: "Tell users I've arrived to my destination",
        FR: "Avertir les utilisateurs que je suis arrivé à ma destination",
      },
      description: {
        EN: "When a user announces they’re heading toward a marker or a person and they arrive at their destination, the people going to the same place — or the person who requested the regroup — are notified via a notification.",
        FR: "Quand un utilisateur annonce qu'il se dirige vers un point/une personne et qu'il arrive à sa destination, les personnes se dirigeant au même endroit/la personne ayant demandé le regroupement sont averties via une notification",
      },
      image: "",
    },
    {
      title: {
        EN: "[Admin] Disable a user account",
        FR: "[Admin] Désactiver le compte d'un utilisateur",
      },
      description: {
        EN: "An admin panel is accessible only from my account. It allows me to authorize or deactivate a user account from using the app. When an account is deactivated, a screen appears informing the user, and they can no longer see or do anything within the app.",
        FR: "Un panel admin est accessible uniquement pour mon compte. Celui-ci me permet d'autoriser ou de désactiver un compte à utiliser l'application. Quand un compte est désactivé, un écran informant l'utilisateur apparaît et il ne peut plus rien voir/faire avec l'app",
      },
      image: "",
    },
    {
      title: {
        EN: "[Admin] Create a user account",
        FR: "[Admin] Créer un compte à un utilisateur",
      },
      description: {
        EN: "An admin panel is accessible only from my account, and it’s the only way to create a new user account. This ensures that unauthorized users cannot access the app.",
        FR: "Un panel admin est accessible uniquement pour mon compte, c'est uniquement à partir de là qu'un compte peut être créé pour éviter que des personnes non autorisées puissent utiliser cette app",
      },
      image: "",
    },
    {
      title: {
        EN: "Hsitory",
        FR: "Historique",
      },
      description: {
        EN: "A history of all events up to 48 hours ago is available.",
        FR: "Un historique de tous les évènements jusqu'à 48h en arrière est disponible.",
      },
      image: "",
    },
  ],
};

export const notMessenger: ProjectType = {
  projectName: {
    EN: "Not-messenger",
    FR: "Not-messenger",
  },
  description: {
    EN: "Messenger clone (web) with most of its features.",
    FR: "Clone de Messenger (web) avec la plupart de ses fonctionnalités",
  },
  stack: ["TypeScript", "React", "MongoDB", "Express", "AWS: S3", "Firebase: Auth", "Socket.io"],
  link: "",
  image: "/images/notMessenger-image.png",
  features: [],
};

export const portfolio: ProjectType = {
  projectName: {
    EN: "Portfolio",
    FR: "Portfolio",
  },
  description: {
    EN: "The portfolio you're currently viewing - a showcase of my projects",
    FR: "Le portfolio que vous regardez actuellement - vitrine de mes projets",
  },
  stack: ["TypeScript", "React", "Sass"],
  link: "",
  image: "/images/portfolio-image.png",
  features: [],
};

export const projectsContainerText = {
  title: {
    EN: "Projects",
    FR: "Projets",
  },
};

export const projectsArr: ProjectType[] = [tOu, notMessenger, portfolio];
