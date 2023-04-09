 배포된 링크: https://profound-choux-3f9265.netlify.app/
 
 개인적으로 블로그를 운영하게되면 제가 자유롭게 커스터마이징가능한 것을 만들고 싶다는 동기로 만들게되었습니다

 해당 블로그 만들때 쓴 스킬 스택은
 React, Typescript, Javascript, Tailwind Css, react-query, react-router, Firebase RealTime Database 로 Netlify 에 배포해뒀습니다

# 주요 흐름

    기본적으로 4페이지가 주축이 된다
        * Introduction : 블로그소개페이지
        * PostLists : 포스팅한것들의 목록을 보여주는 페이지
        * PostDetails : 포스팅한것의 상세한 페이지
        * CreatePost : 새로 포스팅하기위한 페이지로 Admin만 접근 가능하다

    이렇게 주기능을 페이지마다 정리를 해뒀습니다. 여기서 CreatePost 는 Admin 유저 정보를 따로 Firebase RealTime DB 에 
    저장해두어, Admin 일시에만 접근이 가능하게 설정해두었습니다.
    포스팅시에 필요한 메타데이터나 상세내용도 따로 RealTime DB 에 저장합니다.
    포스팅시나, 포스팅 내용 편집시 또는 포스팅 목록 받아올때 API request 를 최소한으로 하기위해 초기 GET 시에 그 내용은 
    react-query 를 이용하여 캐싱을 해둡니다. 그리고 새롭게 업데이트를 할필요가 있다 판단되면 그때그때 조건부토 호출하게합니다.

    API 를 불러 Firebase Real Time DB 랑 상호작용하는 부분 따로 firebase.ts 로 저장합니다 
    DB 안의 각 데이터별로 필요한 API 는 따로 custom hook 을 만들어 관리합니다 => useCategory, useDetail, useMetaData

##   어려웠던 점

*   Firebase Real Time DB 를 통해 데이터 구조를 만드는 게 처음이라, 그 구조를 만드는 것과 해당 구조를 블로그를 맞지않게 만들어 나중에 한번 갈아엎거나 후회한경우가 있었습니다
*   Typescript 로 코딩하는데, js 에서는 아무 문제없이 만든 파일이 타입때문에 문제가 계속생겨 해당부분을 해결해야하는 어려움이 있었습니다

##   개선해야할 점

*   API 요청시, 에러 처리가 미흡한 점이 있습니다. 해당경우 어떤식으로 처리할것인지 결정해야합니다
*   디자인적인면에서 그렇게 인상적이지않아서 해당 부분의 개선이 필요합니다

##   다음번에 시도하게된다면 먼저 고려해야할 점

*   페이지구성에따라 먼저 데이터구조를 생각해보고 구현할 것
*   다음번에는 SEO 에 최적화되는 SSR 구조로 블로그를 구현해볼 것 => Gatsby or Next 로 생각중