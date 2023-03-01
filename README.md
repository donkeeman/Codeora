# Codeora

코더라는 간단하지만 자주 사용하는 코드들을 저장하기 위해 만들어진 사이트입니다.

## 사용 스택

-   `React`
-   `TypeScript`
-   `Styled-Components`
-   `Firebase`
    -   `Authentication` : 로그인, 회원 가입 등 사용자 정보 저장에 사용
    -   `Firestore Database` : 사용자가 작성한 코드 저장에 사용
    -   `Hosting` : 웹 앱 배포에 사용
-   `Recoil`, `Recoil-Persist` : 로그인한 사용자 정보 등 클라이언트 상태 관리에 사용
-   `React-Query` : 사용자가 작성한 코드 글 조회 등 서버 상태 관리에 사용
-   `React-Syntax-Highlighter` : 코드 작성 시 하이라이팅을 주기 위해 사용
-   `React-Fontawesome` : 폰트어썸 아이콘을 리액트에서 불러오기 위하여 사용
-   `StoryBook` : 컴포넌트 테스트를 위해 사용
-   [Adobe Express](https://express.adobe.com/ko-KR/sp/) : 페이지 로고 및 파비콘 제작에 사용

## 추가할 기능

-   모바일 뷰 전용 탭 메뉴 내비게이션 추가하기
-   현재 최종 수정일 내림차순으로 정렬되어 있는 코드 목록을 제목, 언어의 오름차순, 내림차순으로 정렬하는 방법 추가하기
-   제목, 설명, 태그, 언어로 코드 검색 또는 필터링하는 기능 추가하기
-   코드 작성, 수정 중 다른 페이지로 이동 시 beforeunload 이벤트처럼 confirm 창 띄우기
-   사용자 닉네임 변경하는 기능 추가하기
-   사용자 정보에 프로필 사진 추가하기
-   코드 복사 외에도 파일로 다운로드하는 기능 추가하기
-   로그인이나 회원 가입 등에도 리액트 쿼리 적용하기
