import { LightningElement, wire, track } from 'lwc';
import BOOK_OBJECT from "@salesforce/schema/Book__c";
import TITLE_FIELD from "@salesforce/schema/Book__c.Title__c";
import AUTHOR_FIELD from "@salesforce/schema/Book__c.Author__c";
import YEAR_FIELD from "@salesforce/schema/Book__c.YEAR__c";
import PUBLISHER_FIELD from "@salesforce/schema/Book__c.Publisher__c";
import COST_FIELD from "@salesforce/schema/Book__c.Cost__c";
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

import getBookList from '@salesforce/apex/bookController.getBookList'
import insertBook from '@salesforce/apex/bookController.insertBook'

export default class AddBook extends LightningElement {
    objectName = BOOK_OBJECT
    fieldList = [TITLE_FIELD, AUTHOR_FIELD, YEAR_FIELD, PUBLISHER_FIELD, COST_FIELD]
    book
    @wire(getBookList)
    books
    @track bookId;

    formFields = {}
    changeHandler(event) {
        const { name, value } = event.target
        this.formFields[name] = value
    }

    createBook() {
        console.log(this.formFields)
        insertBook({ book: this.formFields })
            .then(result => {
                this.formFields = {}
                this.template.querySelector('form.createForm').reset()
                this.bookId = result.Id;
                const toastEvent = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Book ID' + this.bookId,
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
            })
    }



    successHandler(event) {
        console.log(this.objectName)
        const toastEvent = new ShowToastEvent({
            title: "Book created",
            message: "Book ID " + event.detail.id,
            variant: "Success"
        })
        this.dispatchEvent(toastEvent)
    }

}