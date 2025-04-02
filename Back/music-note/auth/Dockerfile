FROM openjdk:17-alpine

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo Asia/Seoul > /etc/timezone

# Alpine용 패키지 관리자로 locales 설치
RUN apk update && apk add --no-cache libc6-compat

RUN apk add --no-cache bash
RUN apk add --no-cache glibc-i18n

# 로케일 설정
RUN echo "ko_KR.UTF-8 UTF-8" > /etc/locale.gen && locale-gen ko_KR.UTF-8
ENV LANG ko_KR.UTF-8
ENV LANGUAGE ko_KR.UTF-8
ENV LC_ALL ko_KR.UTF-8

# 나머지 Dockerfile 설정
ARG JAR_FILE=build/libs/auth-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} auth.jar

ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/auth.jar"]
