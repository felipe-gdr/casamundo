package com.casamundo.rest;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.activation.MimetypesFileTypeMap;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/upload")
public class Rest_UploadFiles {
    /**
     * Procura a imagem pelo seu nome e devolve como resposta.
     *
     * @param image nome da imagem a procurar
     * @return imagem com o mime type da imagem fonte.
     * @author magician
     * <p>
     * Devolve a imagem com o mime type do ficheiro ou 404 caso
     * o ficheiro n�o seja encontrada.
     */
    @SuppressWarnings("rawtypes")
    @GetMapping(value = "/images", produces = "image/*")
    public ResponseEntity getImage(@PathVariable("image") String image) {

        String folder = "c:/images/casamundo/";
        Mongo mongo;
        try {
            mongo = new Mongo();
            DB db = mongo.getDB("documento");
            DBCollection collection = db.getCollection("setup");
            BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "fotosCasamundo");
            DBObject cursor = collection.findOne(searchQuery);

            if (cursor != null) {
                BasicDBObject obj = (BasicDBObject) cursor.get("documento");
                folder = obj.getString("setupValue");
            }

            mongo.close();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

        File target = new File(folder + image);
        if (!target.exists()) {
            System.out.println("imagem inexistente:" + folder + image);
//            throw new WebApplicationException(404);
        }
        String mt = new MimetypesFileTypeMap().getContentType(target);

        return ResponseEntity.ok().contentType(MediaType.valueOf(mt)).body(target);
    }

    @SuppressWarnings("rawtypes")
    @PostMapping(value = "/files", consumes = "multipart/form-data")
    public ResponseEntity uploadFile(@RequestParam MultipartFile input, @PathVariable("prefix") String prefix) {
        String folder = "c:/images/casamundo/";
        Mongo mongo;

        try {
            mongo = new Mongo();
            DB db = mongo.getDB("documento");
            DBCollection collection = db.getCollection("setup");
            BasicDBObject searchQuery = new BasicDBObject("documento.setupKey", "fotosCasamundo");
            DBObject cursor = collection.findOne(searchQuery);
            if (cursor != null) {
                BasicDBObject obj = (BasicDBObject) cursor.get("documento");
                folder = obj.getString("setupValue");
            }
            mongo.close();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

        String fileName = prefix + "_" + StringUtils.cleanPath(input.getOriginalFilename());

        try {
            try (InputStream inputStream = input.getInputStream()) {
                Files.copy(inputStream, Paths.get(folder + fileName),
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro inesperado ao salvar arquivo");
        }

        return ResponseEntity.ok()
                .body("uploadFile is called, Uploaded file name : " + fileName);
    }
}
