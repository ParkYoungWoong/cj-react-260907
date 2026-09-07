---
name: 'quick-commit'
description: '빠르게 프로젝트를 커밋하고 푸시하는 스킬'
---

# Quick Commit Skill

다음 명령어로 변경 사항을 커밋한다.
커밋 메시지는 다음 명령와 같이 현재 날짜와 시간 양식에 맞게 작성한다.

```bash
git add .
git commit -m "YY-MM-DD hh:mm"
```

다음 명령어로 커밋 내역을 원격 저장소에 푸시한다.
사용자가 따로 요청하지 않으면 항상 푸시한다.

```bash
git push origin main
```
