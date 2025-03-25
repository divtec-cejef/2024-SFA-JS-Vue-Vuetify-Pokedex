import os

# Utiliser le répertoire courant comme racine du projet
racine_projet = os.getcwd()

# Nom du fichier de sortie Markdown
fichier_sortie = 'export_code.md'

# Extensions de fichiers à inclure
extensions_inclure = ['.vue', '.js', '.ts', '.css', '.scss', '.html', '.json', '.md']

# Dossiers à inclure
dossiers_inclure = ['src', 'public']

# Fichiers clés à la racine du projet
fichiers_racine = ['package.json', 'index.html', 'README.md', 'jsconfig.json', 'typed-router.d.ts', 'vite.config.mjs']

# Liste pour stocker les chemins des fichiers inclus (pour la table des matières)
fichiers_inclus = []

# Contenu total à écrire dans le fichier Markdown
contenu_markdown = ''

# Parcourir les fichiers clés à la racine du projet
for fichier in os.listdir(racine_projet):
    chemin_fichier = os.path.join(racine_projet, fichier)
    if os.path.isfile(chemin_fichier) and fichier in fichiers_racine:
        try:
            # Lire et ajouter le contenu du fichier
            with open(chemin_fichier, 'r', encoding='utf-8', errors='ignore') as f:
                contenu = f.read()
                _, extension = os.path.splitext(fichier)
                extension = extension.lstrip('.')
                contenu_markdown += f'## {fichier}\n\n'
                contenu_markdown += f'```{extension}\n{contenu}\n```\n\n'
                fichiers_inclus.append(fichier)
        except Exception as e:
            contenu_markdown += f'*Impossible de lire le fichier {fichier} : {e}*\n\n'

# Parcourir les dossiers spécifiés
for dossier in dossiers_inclure:
    chemin_dossier = os.path.join(racine_projet, dossier)
    if os.path.exists(chemin_dossier):
        for repertoire_actuel, sous_dossiers, fichiers in os.walk(chemin_dossier):
            for fichier in fichiers:
                if any(fichier.endswith(ext) for ext in extensions_inclure):
                    chemin_fichier = os.path.join(repertoire_actuel, fichier)
                    chemin_rel = os.path.relpath(chemin_fichier, racine_projet)
                    try:
                        # Lire et ajouter le contenu du fichier
                        with open(chemin_fichier, 'r', encoding='utf-8', errors='ignore') as f:
                            contenu = f.read()
                            _, extension = os.path.splitext(fichier)
                            extension = extension.lstrip('.')
                            contenu_markdown += f'## {chemin_rel}\n\n'
                            contenu_markdown += f'```{extension}\n{contenu}\n```\n\n'
                            fichiers_inclus.append(chemin_rel)
                    except Exception as e:
                        contenu_markdown += f'*Impossible de lire le fichier {chemin_rel} : {e}*\n\n'

# Écrire la table des matières au début du fichier
with open(fichier_sortie, 'w', encoding='utf-8') as sortie:
    sortie.write('# Table des matières\n\n')
    for chemin in fichiers_inclus:
        # Créer une ancre compatible avec Markdown
        ancre = chemin.lower().replace(' ', '-').replace('.', '').replace('/', '-').replace('\\', '-')
        sortie.write(f'- [{chemin}](#{ancre})\n')
    sortie.write('\n')
    # Écrire le contenu total
    sortie.write(contenu_markdown)
