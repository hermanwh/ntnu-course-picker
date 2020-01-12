// NOT IN USE as of yet 

export function uploadToDb(jsonContent, ref, storage) {
    const configblob = new Blob([JSON.stringify(jsonContent)], {
      type: "application/json"
    });

    const uploadTaskConfig = storage
        .ref(ref)
        .put(configblob);

    // observer for when the state changes, e.g. progress
    uploadTaskConfig.on(
        "state_changed",
        snapshot => {
        // Do nothing as of yet
        },
        error => {
            console.log(error);
        }
    );
}
  
export async function downloadFromDb(ref, storage, setMethod) {
    const downloadRefConfig = storage.ref(ref);
    await downloadRefConfig.getDownloadURL().then(async url => {
      await fetch(url)
        .then(response => response.json())
        .then(jsonData => {
            setMethod(jsonData);
        });
    });
}