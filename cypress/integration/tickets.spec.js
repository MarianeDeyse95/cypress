
describe("Tickets", () =>{
    beforeEach(() => cy.visit("https://bit.ly/2XSuwCW"));

    it("Fills all the text input fields", () =>{
        const firstName = "Mariane"
        const lastName = "Santos"

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("marydeysee@gmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type(`${firstName} ${lastName}`);
        
    });

    it("Select two tickets", () =>{
        cy.get("#ticket-quantity").select("2");
    });

    it("Select 'vip' ticket type", () =>{
        cy.get("#vip").check();
    });


    it("Selects 'social media' checkbox", () =>{
        cy.get("#social-media").check();
    });

    it("Selects'friend'and publication and uncheck 'friend'", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();

    });

    it("has 'TICKETBOX' header´s heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("Alerts on invalid email", () =>{
        cy.get("#email")
        .as("email")
        .type("mari-teste");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
        .clear()
        .type("mariane@teste.com")


        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () =>{
        const firstName = "Mariane"
        const lastName = "Santos"
        const fullName = `${firstName} ${lastName}`;

        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#email").type("marydeysee@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("IPA");
        cy.get("#agree").check();
        cy.get("#signature").type(`${fullName}`);

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        )

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled")

        cy.get("button[type='reset']").click();

        cy.get("@submitButton").should("be.disabled");                


    });



    it("fills mandatory fields using support command", () =>{
        const customer= {
            firstName:"João",
            lastName: "Silva",
            email: "joaosilva@example.com"

        };

        cy.fillsMandatoryFields(customer);

        cy.get("button[type='submit']")
         .as("submitButton")
         .should("not.be.disabled")

        cy.get("#agree").click();

        cy.get("@submitButton").should("be.disabled");      
    });
});