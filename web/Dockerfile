FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAR_FILE
COPY target/casamundo.war app.war
ENTRYPOINT ["java","-jar","-Dmongodb.host=casamundo-mongo","/app.war"]