const sizes = ["iphone-6", [1366, 768]];

beforeEach(() => {
  cy.visit("/");
});

sizes.forEach((size) => {
  describe("Login page", () => {
    it("should login with valid email and password", () => {
      cy.login("bropet@mail.ru", "123");
      cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
    });

    it("should not login with empty email", () => {
      cy.login(null, "123");

      cy.get("#mail").then((elements) => {
        expect(elements[0].checkValidity()).to.be.false;
        expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
      });
    });

    it("should not login with empty password", () => {
      cy.login("bropet@mail.ru", null);

      cy.get("#pass").then((elements) => {
        expect(elements[0].checkValidity()).to.be.false;
        expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
      });
    });
  });

  describe("Add book", () => {
    it("should add book not to favorites", () => {
      cy.login("bropet@mail.ru", "123");
      cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");

      cy.contains("Add new").click();
      cy.addBook(
        "Первая победа",
        "Поэма",
        "test.jpg",
        "book.txt",
        "Александр Ворошилов"
      );
      cy.contains("Submit").click();

      cy.get(".card-footer .btn").should("contain", "Add to favorite");
    });

    it("should add book to favorites", () => {
      cy.login("bropet@mail.ru", "123");
      cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");

      cy.contains("Add new").click();
      cy.addBook(
        "Первая победа",
        "Поэма",
        "test.jpg",
        "book.txt",
        "Александр Ворошилов"
      );
      cy.get("#favorite").click();
      cy.contains("Submit").click();

      cy.get(".card-footer .btn").should("contain", "Delete from favorite");
    });

    it("should not add with empty title", () => {
      cy.login("bropet@mail.ru", "123");
      cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
      cy.contains("Add new").click();

      cy.addBook(null, "Поэма", "test.jpg", "book.txt", "Александр Ворошилов");

      cy.get("#title").then((elements) => {
        expect(elements[0].checkValidity()).to.be.false;
        expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
      });
    });
  });
});
