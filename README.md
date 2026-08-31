# 🌵 FocaAí

> **Seu plano, seu ritmo, seu futuro.**

O **FocaAí** é um planner de estudos desenvolvido para ajudar estudantes do Ensino Médio a organizarem sua rotina acadêmica de forma simples, visual e intuitiva.

O projeto nasceu como parte de uma ação de extensão do curso de **Análise e Desenvolvimento de Sistemas (ADS)**, com o objetivo de aproximar estudantes de escolas públicas da área de tecnologia e apresentar, na prática, como uma ideia pode se transformar em um software.

---

## 📖 Sobre o projeto

A rotina escolar envolve provas, trabalhos, atividades, exercícios e diferentes matérias. Quando essas informações não estão organizadas, acompanhar prazos e prioridades pode se tornar uma tarefa difícil.

Foi a partir desse problema que surgiu o **FocaAí**.

A proposta é reunir em um único aplicativo recursos para que o estudante possa:

- 📚 organizar suas matérias;
- ✅ cadastrar e acompanhar tarefas;
- 📝 registrar provas;
- 📅 visualizar seu planejamento semanal;
- 🎯 definir prioridades;
- 📊 acompanhar seu progresso nos estudos.

Mais do que um planner, o FocaAí também é utilizado como uma ferramenta para demonstrar aos estudantes como funciona o processo de desenvolvimento de software.

---

## 💡 Como surgiu a ideia?

O projeto parte de uma pergunta simples:

> **Como a tecnologia pode ajudar estudantes do Ensino Médio a organizar melhor sua rotina acadêmica?**

A partir dela, seguimos um processo semelhante ao utilizado no desenvolvimento de sistemas:

```text
Problema
   ↓
Análise
   ↓
Levantamento de requisitos
   ↓
Planejamento
   ↓
Design das telas
   ↓
Desenvolvimento
   ↓
Banco de dados
   ↓
Testes
   ↓
Solução
```

Assim, o próprio FocaAí se torna um exemplo prático do que um profissional de **Análise e Desenvolvimento de Sistemas** pode fazer.

---

## 🎯 Objetivo

Desenvolver um aplicativo mobile simples para auxiliar estudantes na organização de seus estudos e utilizá-lo como recurso em uma ação de extensão para apresentar a área de **Análise e Desenvolvimento de Sistemas** a estudantes do Ensino Médio.

### Objetivos específicos

- apresentar ADS de maneira simples e acessível;
- aproximar estudantes de escolas públicas da área de tecnologia;
- demonstrar conceitos básicos de desenvolvimento de software;
- mostrar a relação entre problema, planejamento e solução;
- despertar interesse por programação e desenvolvimento de aplicativos;
- desenvolver uma solução relacionada à realidade dos próprios estudantes.

---

## 👨‍🎓 Público-alvo

O FocaAí foi pensado principalmente para **estudantes do Ensino Médio**, especialmente no contexto de escolas públicas.

Por isso, o aplicativo busca possuir:

- linguagem simples;
- navegação intuitiva;
- interface jovem;
- poucos passos para realizar uma ação;
- organização visual clara.

---

## 📱 Funcionalidades

### 🏠 Página inicial

Apresenta um resumo da rotina acadêmica do estudante, incluindo atividades próximas e progresso semanal.

### 📚 Matérias

Permite organizar tarefas e provas de acordo com as disciplinas escolares.

Exemplos:

- Matemática
- Português
- História
- Geografia
- Inglês

### ✅ Tarefas

Permite cadastrar e acompanhar atividades acadêmicas.

Cada tarefa poderá possuir:

- título;
- descrição;
- matéria;
- data de entrega;
- prioridade;
- situação.

As tarefas podem ser visualizadas como:

```text
Todas | Pendentes | Concluídas
```

### ➕ Nova tarefa

O estudante poderá cadastrar uma atividade informando:

```text
Matéria
Título
Descrição
Data de entrega
Prioridade
```

As prioridades disponíveis são:

```text
🟢 Baixa
🟡 Média
🔴 Alta
```

Toda nova tarefa começa como **pendente**.

### 📝 Provas

Permite registrar avaliações e relacioná-las às respectivas matérias.

### 📅 Planner semanal

Organiza as atividades ao longo dos dias da semana, facilitando a visualização da rotina de estudos.

### 📊 Progresso

O aplicativo calcula o progresso utilizando a quantidade de tarefas concluídas.

Exemplo:

```text
3 de 5 tarefas concluídas

████████████░░░░

60%
```

---

## 🎨 Identidade visual

A identidade visual do FocaAí foi inspirada de forma sutil na cultura **nordestina e pernambucana**, considerando o contexto em que o projeto foi idealizado.

A proposta não é criar uma representação caricata da região, mas utilizar elementos regionais dentro de uma interface moderna.

Algumas referências utilizadas são:

- ☀️ sol;
- 🌵 vegetação;
- formas geométricas;
- paisagens;
- arquitetura regional;
- elementos gráficos inspirados no Nordeste.

### Paleta principal

| Cor | Utilização |
| --- | --- |
| 🔵 Azul-marinho | Identidade, textos e botões |
| 🟠 Laranja | Destaques e ações |
| 🟡 Amarelo | Energia e elementos decorativos |
| 🟢 Verde | Progresso e elementos naturais |
| 🤍 Creme | Fundo principal |

A identidade procura transmitir **educação, juventude, organização, regionalidade e acolhimento**.

---

# ⚙️ Tecnologias

O projeto está sendo desenvolvido utilizando:

- **React Native**
- **JavaScript**
- **Expo**
- **Node.js**
- **PostgreSQL** para modelagem/persistência dos dados

---

## 🗃️ Banco de dados

O banco de dados do FocaAí foi modelado para organizar as principais informações utilizadas pelo aplicativo.

As principais entidades são:

```text
USUARIOS
   │
   ├────< MATERIAS
   │        │
   │        ├────< TAREFAS
   │        │
   │        └────< PROVAS
   │
   └────< PLANEJAMENTOS
                 │
                 └── TAREFA
```

### Principais relacionamentos

- Um usuário pode possuir várias matérias.
- Uma matéria pode possuir várias tarefas.
- Uma matéria pode possuir várias provas.
- Um usuário pode possuir vários planejamentos.
- Um planejamento pode estar relacionado a uma tarefa.

O progresso não precisa ser armazenado como uma entidade independente, pois pode ser calculado utilizando as tarefas concluídas.

---

# 📋 Requisitos do sistema

## 👤 Requisitos do usuário

| Código | Requisito |
| --- | --- |
| RU01 | Organizar atividades escolares |
| RU02 | Cadastrar matérias |
| RU03 | Cadastrar tarefas |
| RU04 | Acompanhar tarefas |
| RU05 | Registrar provas |
| RU06 | Visualizar planejamento semanal |
| RU07 | Acompanhar progresso |
| RU08 | Utilizar o aplicativo facilmente |

---

## ⚙️ Requisitos funcionais

| Código | Requisito |
| --- | --- |
| RF01 | Exibir tela de abertura |
| RF02 | Exibir onboarding |
| RF03 | Exibir página inicial |
| RF04 | Cadastrar matéria |
| RF05 | Listar matérias |
| RF06 | Cadastrar tarefa |
| RF07 | Editar tarefa |
| RF08 | Excluir tarefa |
| RF09 | Concluir tarefa |
| RF10 | Listar tarefas |
| RF11 | Filtrar tarefas |
| RF12 | Cadastrar prova |
| RF13 | Editar prova |
| RF14 | Excluir prova |
| RF15 | Exibir planner semanal |
| RF16 | Calcular progresso |
| RF17 | Exibir progresso |
| RF18 | Armazenar dados |

---

## 🔧 Requisitos não funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | Interface simples e intuitiva |
| RNF02 | Interface responsiva |
| RNF03 | Boa velocidade de resposta |
| RNF04 | Compatibilidade com dispositivos móveis |
| RNF05 | Desenvolvimento utilizando JavaScript |
| RNF06 | Identidade visual consistente |
| RNF07 | Acessibilidade visual |
| RNF08 | Consistência entre telas |
| RNF09 | Simplicidade na utilização |

---

## 📌 Regras de negócio

**RN01** — Toda tarefa deve possuir um título.

**RN02** — Toda tarefa deve estar relacionada a uma matéria.

**RN03** — Toda tarefa deve possuir uma data de entrega.

**RN04** — A prioridade deve ser classificada como **Baixa, Média ou Alta**.

**RN05** — Toda nova tarefa deve começar como **pendente**.

**RN06** — Ao concluir uma tarefa, seu status deve ser alterado para concluída.

**RN07** — O progresso deve ser calculado utilizando as tarefas concluídas.

**RN08** — Toda prova deve estar vinculada a uma matéria.

**RN09** — Uma matéria com tarefas ou provas relacionadas não deve ser excluída sem que esses registros sejam tratados.

---

# 🔄 Fluxo principal

O fluxo básico de utilização do aplicativo será:

```text
Splash Screen
      ↓
Onboarding
      ↓
Home
      ↓
┌─────────────┬─────────────┬─────────────┐
│   Tarefas   │   Planner   │  Matérias   │
└─────────────┴─────────────┴─────────────┘
      ↓
Adicionar atividade
      ↓
Acompanhar progresso
```

---

# 🧩 Exemplo de funcionamento

Ao cadastrar uma tarefa, o estudante informa seus dados:

```text
Matéria: Matemática

Tarefa: Lista de exercícios

Entrega: 05/09/2026

Prioridade: Alta

Status: Pendente
```

Depois de finalizar a atividade:

```text
○ Pendente
     ↓
✓ Concluída
```

Essa alteração também é utilizada para calcular automaticamente o progresso do estudante.

---

# 🚀 Executando o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entre na pasta

```bash
cd FocaAi
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o Expo

```bash
npx expo start
```

Depois, utilize as opções apresentadas pelo Expo para executar o projeto no dispositivo ou ambiente desejado.

---

# 🔮 Possíveis melhorias futuras

O FocaAí foi planejado inicialmente como uma aplicação simples, mas poderá receber novas funcionalidades futuramente, como:

- 🔔 notificações de tarefas e provas;
- ⏱️ cronômetro de estudos;
- 🍅 técnica Pomodoro;
- 🎯 metas de estudo;
- 🏆 sistema de conquistas;
- 📈 acompanhamento de desempenho;
- 🌙 modo escuro;
- 👤 personalização de perfil;
- ☁️ sincronização dos dados;
- 🔐 autenticação de usuários.

---

# 🌱 Projeto de extensão

O FocaAí não foi pensado apenas como um aplicativo.

Durante a ação de extensão, ele será utilizado para demonstrar aos estudantes que o desenvolvimento de software começa com a identificação de um problema e passa por diversas etapas até chegar a uma solução.

A proposta é mostrar que tecnologia envolve:

**criatividade + planejamento + lógica + programação + resolução de problemas.**

Dessa maneira, esperamos contribuir para aproximar jovens da área de tecnologia e apresentar **Análise e Desenvolvimento de Sistemas** como uma possibilidade de formação e atuação profissional.

---

## 💙 FocaAí

> **Organize seus estudos. Construa seu futuro.**

**Seu plano, seu ritmo, seu futuro. 🌵**
