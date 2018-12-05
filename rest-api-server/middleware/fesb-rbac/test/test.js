const assert = require("chai").assert;
const expect = require("chai").expect;
const RBAC = require("../index");
const roles = require("./roles");

RBAC.init(roles);

describe("RBAC: basic permissions", () => {
  describe("Testing reset", () => {
    it("admin can reset", () => {
      const authorized = RBAC.authorized("admin", "reset");
      assert.equal(authorized, true);
    });

    it("member cannot reset", () => {
      const authorized = RBAC.authorized("member", "reset");
      assert.equal(authorized, false);
    });

    it("guest cannot reset", () => {
      const authorized = RBAC.authorized("guest", "reset");
      assert.equal(authorized, false);
    });

    it("johndoe cannot reset", () => {
      const authorized = RBAC.authorized("johndoe", "reset");
      assert.equal(authorized, false);
    });
  });

  describe("Testing edit", () => {
    it("admin can edit", () => {
      const authorized = RBAC.authorized("admin", "edit");
      assert.equal(authorized, true);
    });

    it("member can edit", () => {
      const authorized = RBAC.authorized("member", "edit");
      assert.equal(authorized, true);
    });

    it("guest cannot edit", () => {
      const authorized = RBAC.authorized("guest", "edit");
      assert.equal(authorized, false);
    });

    it("johndoe cannot edit", () => {
      const authorized = RBAC.authorized("johndoe", "edit");
      assert.equal(authorized, false);
    });
  });

  describe("Testing delete", () => {
    it("admin can delete", () => {
      const authorized = RBAC.authorized("admin", "delete");
      assert.equal(authorized, true);
    });

    it("member cannot delete", () => {
      const authorized = RBAC.authorized("member", "delete");
      assert.equal(authorized, false);
    });

    it("guest cannot delete", () => {
      const authorized = RBAC.authorized("guest", "delete");
      assert.equal(authorized, false);
    });

    it("johndoe cannot delete", () => {
      const authorized = RBAC.authorized("johndoe", "delete");
      assert.equal(authorized, false);
    });
  });

  describe("Testing write", () => {
    it("admin can write", () => {
      const authorized = RBAC.authorized("admin", "write");
      assert.equal(authorized, true);
    });

    it("member can write", () => {
      const authorized = RBAC.authorized("member", "write");
      assert.equal(authorized, true);
    });

    it("guest cannot write", () => {
      const authorized = RBAC.authorized("guest", "write");
      assert.equal(authorized, false);
    });

    it("johndoe cannot write", () => {
      const authorized = RBAC.authorized("johndoe", "write");
      assert.equal(authorized, false);
    });
  });

  describe("Testing read", () => {
    it("admin can read", () => {
      const authorized = RBAC.authorized("admin", "read");
      assert.equal(authorized, true);
    });

    it("member can read", () => {
      const authorized = RBAC.authorized("member", "read");
      assert.equal(authorized, true);
    });

    it("guest can read", () => {
      const authorized = RBAC.authorized("guest", "read");
      assert.equal(authorized, true);
    });

    it("johndoe cannot read", () => {
      const authorized = RBAC.authorized("johndoe", "read");
      assert.equal(authorized, false);
    });
  });
});

describe("RBAC: testing role 'test'", () => {
  it("'test' inherits 'admin' permissions", () => {
    const testperms = RBAC.roles["test"];
    const adminperms = RBAC.roles["admin"];
    expect(testperms).to.deep.equal(adminperms);
  });
});

describe("RBAC: nonexistent permission/action", () => {
  const action = "blablabla";
  it(`roles should not be authorized for nonexistent action "${action}"`, () => {
    ["admin", "member", "guest"].forEach(role => {
      const authorized = RBAC.authorized(role, action);
      assert.isNotTrue(
        authorized,
        `"${role}" authorized for nonexistent permission "${action}"`
      );
    });
  });
});
