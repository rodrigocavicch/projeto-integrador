from flask import Flask, render_template, request, redirect, url_for, jsonify

from flask_mysqldb import MySQL

from config import DB_CONFIG

app = Flask(__name__)
app.config['MYSQL_HOST'] = DB_CONFIG['MYSQL_HOST']
app.config['MYSQL_USER'] = DB_CONFIG['MYSQL_USER']
app.config['MYSQL_PASSWORD'] = DB_CONFIG['MYSQL_PASSWORD']
app.config['MYSQL_DB'] = DB_CONFIG['MYSQL_DB']
app.config['MYSQL_PORT'] = DB_CONFIG['MYSQL_PORT']

mysql = MySQL(app)

def fetch_all(query):
    cur = mysql.connection.cursor()
    cur.execute(query)
    rv = cur.fetchall()
    cur.close()
    return rv

@app.route("/")
def hello_world():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM alunos")
    rv = cur.fetchall()  # Fetch all rows
    cur.close()

    return jsonify(rv)

@app.route("/login")
def login():
    return render_template('login.html')  # Flask will look for this in the 'templates' folder

@app.route("/aula_aluno")
def aula_aluno():
    return render_template('aula_aluno.html')

@app.route("/aula_aluno_inscrito")
def aula_aluno_inscrito():
    return render_template('aula_aluno_inscrito.html')

@app.route("/aula_monitor")
def aula_monitor():
    return render_template('aula_monitor.html')

@app.route("/cadastro_aluno")
def cadastro_aluno():
    return render_template('cadastro_aluno.html')

@app.route("/cadastro_monitor")
def cadastro_monitor():
    return render_template('cadastro_monitor.html')

@app.route("/conta_aluno")
def conta_aluno():
    return render_template('conta_aluno.html')

@app.route("/conta_monitor")
def conta_monitor():
    return render_template('conta_monitor.html')

@app.route("/contato")
def contato():
    return render_template('contato.html')

@app.route("/criar_aula")
def criar_aula():
    return render_template('criar_aula.html')

@app.route("/home_aluno")
def home_aluno():
    return render_template('home_aluno.html')

@app.route("/home_monitor")
def home_monitor():
    return render_template('home_monitor.html')

@app.route("/landing_page")
def landing_page():
    return render_template('landing_page.html')

@app.route("/minhas_aulas_aluno")
def minhas_aulas_aluno():
    return render_template('minhas_aulas_aluno.html')

@app.route("/sobre")
def sobre():
    return render_template('sobre.html')
    
@app.route("/api/alunos", methods=["GET"])
def get_alunos():
    rows = fetch_all("SELECT * FROM alunos")
    alunos = [
        {
            "id_aluno": row[0],
            "nome_aluno": row[1],
            "email_aluno": row[2],
            "senha_aluno": row[3],
            "nasc_aluno": row[4].strftime('%Y-%m-%d'),
            "cpf_aluno": row[5],
            "tel_aluno": row[6],
            "gen_aluno": row[7]
        }
        for row in rows
    ]
    return jsonify(alunos)

# Route for fetching all rows from the 'monitores' table
@app.route("/api/monitores", methods=["GET"])
def get_monitores():
    rows = fetch_all("SELECT * FROM monitores")
    monitores = [
        {
            "id_monitor": row[0],
            "nome_monitor": row[1],
            "email_monitor": row[2],
            "senha_monitor": row[3],
            "nasc_monitor": row[4].strftime('%Y-%m-%d'),
            "cpf_monitor": row[5],
            "tel_monitor": row[6],
            "gen_monitor": row[7]
        }
        for row in rows
    ]
    return jsonify(monitores)

# Route for fetching all rows from the 'materias' table
@app.route("/api/materias", methods=["GET"])
def get_materias():
    rows = fetch_all("SELECT * FROM materias")
    materias = [
        {
            "id_materia": row[0],
            "nome_materia": row[1]
        }
        for row in rows
    ]
    return jsonify(materias)

# Route for fetching all rows from the 'mat_monitor' table
@app.route("/api/mat_monitor", methods=["GET"])
def get_mat_monitor():
    rows = fetch_all("SELECT * FROM mat_monitor")
    mat_monitor = [
        {
            "id_mat_monitor": row[0],
            "id_monitor": row[1],
            "id_materia": row[2]
        }
        for row in rows
    ]
    return jsonify(mat_monitor)

# Route for fetching all rows from the 'aulas' table
@app.route("/api/aulas", methods=["GET"])
def get_aulas():
    rows = fetch_all("SELECT * FROM aulas")
    aulas = [
        {
            "id_aula": row[0],
            "horario": row[1].strftime('%Y-%m-%d %H:%M:%S'),
            "link": row[2],
            "id_materia": row[3],
            "id_monitor": row[4]
        }
        for row in rows
    ]
    return jsonify(aulas)

# @app.route("/api/id_materia", )

# Route for fetching all rows from the 'aula_aluno' table
@app.route("/api/aula_aluno", methods=["GET"])
def get_aula_aluno():
    rows = fetch_all("SELECT * FROM aula_aluno")
    aula_aluno = [
        {
            "id_aula_aluno": row[0],
            "id_aula": row[1],
            "id_aluno": row[2]
        }
        for row in rows
    ]
    return jsonify(aula_aluno)

@app.route('/api/alunos', methods=['POST'])
def create_aluno():
    try:
        data = request.get_json()  # Get the JSON data sent by the frontend
        # Process the data, insert it into the database, etc.
        cursor = mysql.connection.cursor()
        cursor.execute('''
            INSERT INTO alunos (nome_aluno, email_aluno, senha_aluno, nasc_aluno, cpf_aluno, tel_aluno, gen_aluno)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (data['nome_aluno'], data['email_aluno'], data['senha_aluno'], data['nasc_aluno'],
              data['cpf_aluno'], data['tel_aluno'], data['gen_aluno']))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'message': 'Cadastro realizado com sucesso'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/monitores', methods=['POST'])
def create_monitor():
    try:
        data = request.get_json()  # Obtém os dados JSON enviados pelo frontend
        # Processa os dados, insere no banco de dados, etc.
        cursor = mysql.connection.cursor()
        cursor.execute('''
            INSERT INTO monitores (nome_monitor, email_monitor, senha_monitor, nasc_monitor, cpf_monitor, tel_monitor, gen_monitor)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (data['nome_monitor'], data['email_monitor'], data['senha_monitor'], data['nasc_monitor'],
              data['cpf_monitor'], data['tel_monitor'], data['gen_monitor']))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'message': 'Monitor cadastrado com sucesso'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# @app.route('/api/aulas', methods=['POST'])
# def create_aula():
#     try:
#         data = request.get_json()  # Obtém os dados JSON enviados pelo frontend
#         # Processa os dados, insere no banco de dados, etc.
#         cursor = mysql.connection.cursor()
#         cursor.execute('''
#             INSERT INTO aulas (horario, link, id_materia, id_monitor)
#             VALUES (%s, %s, %s, %s)
#         ''', (data['horario'], data['link'], data['id_materia'], data['id_monitor']))
#         mysql.connection.commit()
#         cursor.close()

#         return jsonify({'message': 'Aula criada com sucesso'}), 201
#     except Exception as e:
#         return jsonify({'error': str(e)}), 400


















if __name__ == "__main__":
    app.run(debug=True)