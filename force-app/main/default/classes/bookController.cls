public with sharing class bookController {
    
    @AuraEnabled(cacheable=true)
    public static List<Book__c> getBookList(){
        return [SELECT Id, Title__c, Author__c, Year__c, Publisher__c, Cost__c from Book__c];
    }

    @AuraEnabled
    public static Book__c insertBook(Book__c book){
        try {
            insert book;
            return book;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }

    @InvocableMethod(label='Add book' description='')
    public static void insertBookFlow(List<Book__c> NewBook){
        try {
            insert NewBook;
        } catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
    }
}

