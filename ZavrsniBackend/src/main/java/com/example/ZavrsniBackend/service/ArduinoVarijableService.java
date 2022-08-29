package com.example.ZavrsniBackend.service;

import com.example.ZavrsniBackend.model.ArduinoVarijable;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class ArduinoVarijableService {


    public ArduinoVarijable getArduinoVarijable(String name) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("ArduinoVarijable").document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        ArduinoVarijable arduinoVarijable = null;
        if (document.exists()) {

            arduinoVarijable = document.toObject(ArduinoVarijable.class);
            return arduinoVarijable;
        } else {
            return null;
        }
    }

    public String updateArduinoVarijablu(String varname, String varvalue, String docname) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection("ArduinoVarijable").document(docname).update(varname, varvalue);
        return collectionApiFuture.get().getUpdateTime().toString();

    }

}
