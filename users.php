
        <?php
        // Fonction pour remplir les utilisateurs
        function fillUsers(){
            // Initialisation de la requête curl
            $curl = curl_init();
            
            // Définition des options de la requête
            curl_setopt_array($curl, array(
              CURLOPT_URL => 'https://randomuser.me/api/?results=50',
              CURLOPT_RETURNTRANSFER => true,
              CURLOPT_ENCODING => '',
              CURLOPT_MAXREDIRS => 10,
              CURLOPT_TIMEOUT => 0,
              CURLOPT_FOLLOWLOCATION => true,
              CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
              CURLOPT_SSL_VERIFYHOST => false,
              CURLOPT_SSL_VERIFYPEER => false,
              CURLOPT_CUSTOMREQUEST => 'GET',
            ));
            
            // Exécution de la requête
            $response = curl_exec($curl);
            
            // Fermeture de la requête
            curl_close($curl);
            
            // Décode le JSON reçu
            $data = json_decode($response, true);
            
            // Affichage des informations des personnes
            echo '<h2>Personnes obt avec la request</h2>';
            echo '<ul>';
            foreach ($data['results'] as $person) {
                echo '<li>';
                echo '<h3>' . $person['name']['first'] . ' ' . $person['name']['last'] . '</h3>';
                echo '<p>Adresse : ' . $person['location']['street']['number'] . ' ' . $person['location']['street']['name'] . ', ' . $person['location']['city'] . ', ' . $person['location']['state'] . ' ' . $person['location']['postcode'] . '</p>';
                echo '<p>Téléphone : ' . $person['phone'] . '</p>';
                echo '<p>Email : ' . $person['email'] . '</p>';
                echo '</li>';
            }
            echo '</ul>';
        }
        ?>