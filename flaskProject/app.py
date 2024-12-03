from flask import Flask, render_template, request, redirect, url_for, jsonify, session

from flask_mysqldb import MySQL

from config import DB_CONFIG

app = Flask(__name__)

app.config['MYSQL_HOST'] = DB_CONFIG['MYSQL_HOST']
app.config['MYSQL_USER'] = DB_CONFIG['MYSQL_USER']
app.config['MYSQL_PASSWORD'] = DB_CONFIG['MYSQL_PASSWORD']
app.config['MYSQL_DB'] = DB_CONFIG['MYSQL_DB']
app.config['MYSQL_PORT'] = DB_CONFIG['MYSQL_PORT']

mysql = MySQL(app)
app.secret_key = "12345"  # Necessário para usar sessões

def fetch_all(query):
    cur = mysql.connection.cursor()
    cur.execute(query)
    rv = cur.fetchall()
    cur.close()
    return rv

def fetch_one(query, params=None):
    cur = mysql.connection.cursor()
    if params:
        cur.execute(query, params)
    else:
        cur.execute(query)
    rv = cur.fetchall()
    cur.close()
    return rv

def validate_user(email, senha, is_monitor=False):
    query = (
        "SELECT id_aluno, nome_aluno FROM alunos WHERE email_aluno=%s AND senha_aluno=%s"
        if not is_monitor
        else "SELECT id_monitor, nome_monitor FROM monitores WHERE email_monitor=%s AND senha_monitor=%s"
    )
    try:
        result = fetch_one(query, (email, senha))
        print(f"Query executada: {query} com parâmetros: {email}, {senha}")
        return result[0] if result else None
    except Exception as e:
        print(f"Erro ao validar usuário: {e}")
        return None

@app.route("/")
def landing_page():
    return render_template('landing_page.html')

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
    if session.get("user_type") != "aluno":
        return redirect("/login")  # Redireciona para o login se não for aluno
    return render_template('home_aluno.html')

@app.route("/home_monitor")
def home_monitor():
    if session.get("user_type") != "monitor":
        return redirect("/login")  # Redireciona para o login se não for monitor
    return render_template('home_monitor.html')

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

@app.route("/login_func", methods=["POST"])
def login_func():
    print("Função Login")
    data = request.json
    print(f"{data}")
    email = data.get("email")
    senha = data.get("senha")

    if not email or not senha:
        return jsonify({"success": False, "message": "Preencha todos os campos."}), 400

    # Primeiro, tenta validar como aluno
    user = validate_user(email, senha, is_monitor=False)
    if user:
        session["user_id"] = user[0]
        session["user_type"] = "aluno"
        session["user_name"] = user[1]
        return jsonify({"success": True, "redirect": "/home_aluno"})

    # Caso não seja aluno, tenta como monitor
    user = validate_user(email, senha, is_monitor=True)
    if user:
        session["user_id"] = user[0]
        session["user_type"] = "monitor"
        session["user_name"] = user[1]
        return jsonify({"success": True, "redirect": "/home_monitor"})

    # Se não for encontrado, retorna erro
    return jsonify({"success": False, "message": "Credenciais inválidas."}), 401

@app.route("/api/minhas_aulas", methods=["GET"])
def get_minhas_aulas():
    try:
        user_id = session.get("user_id")
        if not user_id:
            print("Erro: Usuário não autenticado")
            return jsonify({"error": "Usuário não autenticado"}), 401

        print(f"Buscando aulas para o usuário com ID: {user_id}")

        query = """
        SELECT aulas.id_aula, aulas.titulo, aulas.horario, materias.nome_materia AS materia, monitores.nome AS monitor
        FROM aula_aluno
        JOIN aulas ON aulas.id_aula = aula_aluno.id_aula
        JOIN materias ON aulas.id_materia = materias.id_materia
        JOIN monitores ON aulas.id_monitor = monitores.id_monitor
        WHERE aula_aluno.id_aluno = %s
        """
        aulas = fetch_all(query, (user_id,))  # Substitua pela sua função de consulta
        print(f"Aulas encontradas: {aulas}")

        aulas_formatadas = [
            {
                "id_aula": aula[0],
                "titulo": aula[1],
                "horario": aula[2].strftime('%Y-%m-%d %H:%M:%S'),
                "materia": aula[3],
                "monitor": aula[4]
            }
            for aula in aulas
        ]
        return jsonify(aulas_formatadas)

    except Exception as e:
        print(f"Erro no endpoint '/api/minhas_aulas': {e}")
        return jsonify({"error": "Erro interno no servidor"}), 500


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

@app.route("/api/aulas", methods=["GET"])
def get_aulas():
    query = """
    SELECT 
        a.id_aula, 
        a.titulo, 
        a.horario, 
        a.descricao, 
        m.nome_materia AS materia, 
        mn.nome_monitor AS monitor
    FROM aulas a
    LEFT JOIN materias m ON a.id_materia = m.id_materia
    LEFT JOIN monitores mn ON a.id_monitor = mn.id_monitor
    """
    rows = fetch_all(query)
    aulas = [
        {
            "id_aula": row[0],
            "titulo": row[1],
            "horario": row[2].strftime('%d/%m/%Y %H:%M'),
            "descricao": row[3],
            "materia": row[4],
            "monitor": row[5]
        }
        for row in rows
    ]
    return jsonify(aulas)


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
    
@app.route("/logout")
def logout():
    session.clear()  # Remove todos os dados armazenados na sessão
    return redirect("/")

@app.route("/debug/sessao", methods=["GET"])
def debug_sessao():
    return jsonify(dict(session))  # Transforma a sessão em um dicionário JSON


if __name__ == "__main__":
    app.run(debug=True)