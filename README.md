# LifeTracker 프로젝트

**LifeTracker**는 사용자가 매일 할 일과 감정을 기록하고, 이를 통해 성장하는 모습을 추적할 수 있는 애플리케이션입니다. 할 일 관리, 감정 트래킹, 목표 성취율 분석 등을 한 번에 처리할 수 있습니다.

## 주요 기능
- **로그인 / 회원가입**: 사용자는 계정을 생성하고 로그인하여 개인 데이터를 관리할 수 있습니다.
- **할 일 관리**: 사용자는 할 일을 추가하고, 수정하고, 삭제할 수 있습니다.
- **감정 트래킹**: 사용자는 하루의 감정을 기록하고, 이를 기반으로 일별 감정 분석을 볼 수 있습니다.
- **대시보드**: 사용자는 로그인 후 대시보드를 통해 주요 정보 및 통계를 확인할 수 있습니다.

## 기술 스택
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)


## 프로젝트 폴더 구조 
```
Frontend
📦src
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┣ 📂layout
 ┃ ┣ 📂mood
 ┃ ┃ ┣ 📜MoodChart.jsx
 ┃ ┃ ┣ 📜MoodForm.jsx
 ┃ ┃ ┣ 📜MoodHistory.jsx
 ┃ ┃ ┗ 📜MoodWeeklyChart.jsx
 ┃ ┣ 📂todo
 ┃ ┃ ┣ 📜TodoCompletionMessage.jsx
 ┃ ┃ ┣ 📜TodoForm.jsx
 ┃ ┃ ┣ 📜TodoItem.jsx
 ┃ ┃ ┗ 📜TodoStats.jsx
 ┃ ┗ 📜CalendarView.jsx
 ┣ 📂context
 ┣ 📂pages
 ┃ ┣ 📜Mood.jsx
 ┃ ┣ 📜Todos.jsx
 ┣ 📂routes
 ┣ 📂services
 ┣ 📂styles
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜App.test.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┣ 📜logo.svg
 ┣ 📜reportWebVitals.js
 ┗ 📜setupTests.js
```

```
backend
📦src
 ┣ 📂config
 ┣ 📂controllers
 ┣ 📂middleware
 ┣ 📂models
 ┗ 📂routes
```

## 페이지 구조
- `/` : **Welcome 페이지** - LifeTracker에 대한 소개 페이지입니다.
- `/account` : **로그인 / 회원가입 페이지** - 사용자가 계정을 생성하고 로그인할 수 있는 페이지입니다.
- `/dashboard` : **대시보드** - 로그인 후 사용자의 할 일, 감정 상태 및 통계를 확인할 수 있습니다.
- `/todos` : **할 일 관리 페이지** /  **감정 기록 페이지**  - 사용자가 할 일을 추가, 수정, 삭제할 수 있으며 하루의 감정을 기록하고 분석할 수 있는 페이지입니다. 또한 기록을 볼 수 있습니다.


