function backupTestCheckins (req, res, next) {
    const path = req.path;
    const method = req.method;
    const data = req.body;
    const parsedData = data.message.split('\r\n')
    console.log('duplicati testing backup checkins ' + path + ' method ' + method)
    console.log('checkin packet: ' + '\n' + JSON.stringify(data))
    res.status(200)
        .json({
            status: 'success',
            data: data,
            message: 'Duplicati finished '
        });
};

function parseDuplicatiReport (data) {
    //insert parsing code here
    const data = {
        "message": "Duplicati Backup report for Testing\r\n\r\nDeletedFiles: 0\r\nDeletedFolders: 0\r\nModifiedFiles: 0\r\nExaminedFiles: 1\r\nOpenedFiles: 0\r\nAddedFiles: 0\r\nSizeOfModifiedFiles: 0\r\nSizeOfAddedFiles: 0\r\nSizeOfExaminedFiles: 10\r\nSizeOfOpenedFiles: 0\r\nNotProcessedFiles: 0\r\nAddedFolders: 0\r\nTooLargeFiles: 0\r\nFilesWithError: 0\r\nModifiedFolders: 0\r\nModifiedSymlinks: 0\r\nAddedSymlinks: 0\r\nDeletedSymlinks: 0\r\nPartialBackup: False\r\nDryrun: False\r\nMainOperation: Backup\r\nParsedResult: Success\r\nVersion: 2.0.4.5 (2.0.4.5_beta_2018-11-28)\r\nEndTime: 2/16/2019 10:23:51 PM (1550384631)\r\nBeginTime: 2/16/2019 10:23:50 PM (1550384630)\r\nDuration: 00:00:00.1900598"
    }

    console.log('raw data ' + data.message)
    const parsedData = data.message.split('\r\n') //adds each line as a new spot in the array
    console.log("parsed data" + JSON.stringify(parsedData[2]))
    const obj = {}
    console.log(parsedData[2].split(':')[1].trim())
    obj[parsedData[2].split(':')[0].trim()] = parsedData[2].split(':')[1].trim() //parses parsed array even further to add each section as an obj key & value
    //this obj will be able to be processed or sent to db
    //should check each index in the parsed array to skip empty indexes

    console.log('new obj parsed: ' + '\n' + JSON.stringify(obj))
    //should loop through the results and parse if it isn't an empty string (for '\r\n\r\n' in the 2nd line)
};

//Duplicati-monitor URL: https://www.duplicati-monitoring.com/log/ClubSpeed/UnpMFKdvgf1adeI/8546

/*
1 Good Respsonse: 
{
    "message": "Duplicati Backup report for Testing\r\n\r\nDeletedFiles: 0\r\nDeletedFolders: 0\r\nModifiedFiles: 0\r\nExaminedFiles: 1\r\nOpenedFiles: 0\r\nAddedFiles: 0\r\nSizeOfModifiedFiles: 0\r\nSizeOfAddedFiles: 0\r\nSizeOfExaminedFiles: 10\r\nSizeOfOpenedFiles: 0\r\nNotProcessedFiles: 0\r\nAddedFolders: 0\r\nTooLargeFiles: 0\r\nFilesWithError: 0\r\nModifiedFolders: 0\r\nModifiedSymlinks: 0\r\nAddedSymlinks: 0\r\nDeletedSymlinks: 0\r\nPartialBackup: False\r\nDryrun: False\r\nMainOperation: Backup\r\nParsedResult: Success\r\nVersion: 2.0.4.5 (2.0.4.5_beta_2018-11-28)\r\nEndTime: 2/16/2019 10:23:51 PM (1550384631)\r\nBeginTime: 2/16/2019 10:23:50 PM (1550384630)\r\nDuration: 00:00:00.1900598"
}
1 Error Response: 
{
    "message": "Duplicati Backup report for Testing\r\n\r\nFailed: Found 17 files that are missing from the remote storage, please run repair\r\nDetails: Duplicati.Library.Interface.UserInformationException: Found 17 files that are missing from the remote storage, please run repair\r\n   at Duplicati.Library.Main.Operation.FilelistProcessor.VerifyRemoteList(BackendManager backend, Options options, LocalDatabase database, IBackendWriter log, String protectedfile)\r\n   at Duplicati.Library.Main.Operation.BackupHandler.PreBackupVerify(BackendManager backend, String protectedfile)\r\n   at Duplicati.Library.Main.Operation.BackupHandler.<RunAsync>d__19.MoveNext()\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n   at CoCoL.ChannelExtensions.WaitForTaskOrThrow(Task task)\r\n   at Duplicati.Library.Main.Controller.<>c__DisplayClass13_0.<Backup>b__0(BackupResults result)\r\n   at Duplicati.Library.Main.Controller.RunAction[T](T result, String[]& paths, IFilter& filter, Action`1 method)\r\n\r\nLog data:\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-b56f6850123d049c59b5f2ac278e21412.dblock.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-i423c34e7c89b4bc2b7a795322cb1eccb.dindex.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-20190217T064813Z.dlist.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-b7644803eb6754fd291cb67b6c33ba0a1.dblock.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-i925226570c5640b9a50852ed745022a4.dindex.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-20190217T071011Z.dlist.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-b8a48e534b9a14390b01b8bf20ae12fec.dblock.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-i7cc6c477df5f4834820456176ec1de30.dindex.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-20190217T071040Z.dlist.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-b625782a4916a4367a781be9b7e2559c9.dblock.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-i754e267a67f7409faffe9dc1a6391df1.dindex.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-20190217T071123Z.dlist.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-be066130e4c5c46859d9dcf6fe7d4f4f5.dblock.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-ibecf8f1413174f1dad36084e7226c7d8.dindex.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-20190217T071237Z.dlist.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-bcdcac7d7b9c14ab3ad53998632030b79.dblock.zip.aes\r\n2019-02-16 23:15:11 -08 - [Warning-Duplicati.Library.Main.Operation.FilelistProcessor-MissingFile]: Missing file: duplicati-i161a6f594c824c448d2b8e120bf548b2.dindex.zip.aes\r\n2019-02-16 23:15:11 -08 - [Error-Duplicati.Library.Main.Operation.FilelistProcessor-MissingRemoteFiles]: Found 17 files that are missing from the remote storage, please run repair\r\n2019-02-16 23:15:11 -08 - [Error-Duplicati.Library.Main.Operation.BackupHandler-FatalError]: Fatal error\r\nDuplicati.Library.Interface.UserInformationException: Found 17 files that are missing from the remote storage, please run repair\r\n   at Duplicati.Library.Main.Operation.FilelistProcessor.VerifyRemoteList(BackendManager backend, Options options, LocalDatabase database, IBackendWriter log, String protectedfile)\r\n   at Duplicati.Library.Main.Operation.BackupHandler.PreBackupVerify(BackendManager backend, String protectedfile)\r\n   at Duplicati.Library.Main.Operation.BackupHandler.<RunAsync>d__19.MoveNext()\r\n"
}
*/
module.exports = {
    backupTestCheckins: backupTestCheckins
}