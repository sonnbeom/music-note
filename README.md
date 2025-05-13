# MusicNote

## 프로젝트 소개
- 당신이 듣는 음악이 당신을 말하다. 유저들이 들은 음악을 바탕으로 사람들의 성향을 분석하고, 성향에 어울리는 크로스 도메인을 추천하는 프로젝트입니다.

### 배경 소개
- 삼성소프트웨어 아카데미 특화 프로젝트로 진행된 프로젝트로, 2025년 3월 3일부터 4월 11일까지 6주 간 진행된 프로젝트입니다.
- 6명이 진행하였으며, 프론트엔드드 2명, 백엔드 2명, 빅데이터 분석 2명으로 진행했습니다.


## 주요 기능
1. Spotify API를 활용하여 최근 들은 음악을 기준으로 성향을 분석합니다.
2. 분석한 성향 (Big Five 기반)을 일간, 주간 기준으로 레포트를 제공함으로써 인지하지 못한 메타인지에 대해 알려줍니다.
3. 분석한 성향을 바탕으로 유저의 성향에 맞는 컨텐츠를 추천합니다.(책, 음악, 영화)


## 시스템 아키텍처
![시스템 아키텍처](Back/img/SystemArchitecture.png)

## 기술 스택
### Frontend
- React
- TypeScript
- Tailwind.css

### Backend
- Java 17, Spring Boot
- Redis, Kafka 3.7 (KRaft 기반)
- MySQL, MongoDB
- Jenkins, Docker, AWS EC2, Elasticsearch, Logstash, Kibana

### DataAnalysis
- Fast API
- Pytorch
- scikit-learn

### 담당
- **Jenkins와 Nginx를 활용하여 블루-그린 무중단 배포 기반의 CI/CD 파이프라인 구축**
- **MSA 아키텍처 기반 8개 모듈 분리 및 각 모듈별 배포 자동화**
- **ELK Stack을 이용한 로그 수집 및 시각화**
    - **시간대별 사용자 요청량 분석**
    - **API 응답 시간 수집 및 병목 구간 파악**
    - **사용자 도메인 선호도 분석**
    - **행동 로그 기반 사용자 여정 추적**
    - **에러 로그 수집 및 Kibana 대시보드 구성**
- **Spotify 기반 소셜 로그인 구현** (Spring Security + OAuth 2.0)



