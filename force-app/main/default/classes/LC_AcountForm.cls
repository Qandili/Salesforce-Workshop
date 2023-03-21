public with sharing class LC_AcountForm {

    @AuraEnabled
    public static string createAccount(Account account){
        try {
            insert account;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return 'Account created successfully';
    }

    



}