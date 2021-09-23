import { LightningElement, wire } from 'lwc';
import BOOK_OBJECT from "@salesforce/schema/Book__c";
import TITLE_FIELD from "@salesforce/schema/Book__c.Title__c";
import AUTHOR_FIELD from "@salesforce/schema/Book__c.Author__c";
import YEAR_FIELD from "@salesforce/schema/Book__c.YEAR__c";
import PUBLISHER_FIELD from "@salesforce/schema/Book__c.Publisher__c";
import COST_FIELD from "@salesforce/schema/Book__c.Cost__c";
import BOOK_FIELD from '@salesforce/schema/Book__c.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'


import getBookList from '@salesforce/apex/bookController.getBookList'

export default class EditBook extends LightningElement {
    recordId
    selectedBook = ''
    bookOptions=[]
    @wire(getBookList)
    getBooks({data, error}){
        if (data) {
            console.log(data)
            this.bookOptions = [...this.generateOptions(data)]
        }
        if (error) {
            console.log(error)
        }
    }
    
    

    objectName = BOOK_OBJECT
    fields = {
        id: BOOK_FIELD,
        title: TITLE_FIELD,
        author: AUTHOR_FIELD,
        year: YEAR_FIELD,
        publisher: PUBLISHER_FIELD,
        cost: COST_FIELD
    }

    generateOptions(data) {
        return data.map(item => ({ label: item.Title__c, value: item.Id }))
    }
    
    handleChange(event) {
        this.recordId = event.detail.value;
    }

    successHandler(event){
        const toastEvent = new ShowToastEvent({
            title: "Book Updated",
            message: "Book ID " + event.detail.id,
            variant: "Success"
        })
        this.dispatchEvent(toastEvent)
        
    }
     

    
}