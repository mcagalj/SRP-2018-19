/**
 * Returns an array of unique roles that the given role
 * inherits from.
 * @param {*} roles The object describing a RBAC model.
 * @param {*} role The role for which we retrieve ancestors.
 * @param {*} ancestors The accumulator array.
 * @param {*} iteration Limits the depth of the recursion.
 */
function getAncestors(roles, role, ancestors = [], iteration = 1) {
  const { inherits } = roles[role] || {};

  // Has the maximum number of iterations been reached?
  // Does the role inherit other roles?
  if (Object.keys(roles).length === iteration || !inherits) {
    return ancestors;
  }

  return inherits.reduce((_ancestors, _role) => {
    if (!roles[_role] || ancestors.includes(_role)) {
      return _ancestors;
    }

    return [
      ..._ancestors,
      ...getAncestors(roles, _role, [...ancestors, _role], iteration++)
    ];
  }, []);
}

/**
 * A simple helper function that returns an array of unique
 * roles that the given role inherits from; the array also
 * comprises the given role itself.
 * @param {*} roles
 * @param {*} role
 */
function getRoles(roles, role) {
  if (roles[role]) {
    // Return a unique set of roles
    return [...new Set([role, ...getAncestors(roles, role)])];
  }
  return [];
}

/**
 * Consolidates permissions for the given role. Permissions
 * can be inherited from other roles.
 * @param {*} roles
 * @param {*} role
 */
function getPermissions(roles, role) {
  return getRoles(roles, role).reduce((_permissions, _role) => {
    const { permissions } = roles[_role] || [];
    if (!permissions) return _permissions;

    return {
      ..._permissions,
      ...permissions.reduce((__permissions, perm) => {
        if (typeof perm === "string") {
          return { ...__permissions, [perm]: perm };
        } else if (
          typeof perm === "object" &&
          typeof perm.name === "string" &&
          typeof perm.condition === "function"
        ) {
          return { ...__permissions, [perm.name]: perm.condition };
        }

        return __permissions;
      }, {})
    };
  }, {});
}

/**
 * Consolidates a set of unique roles with both assigned
 * and inherited permissions into a map of the form:
 * {role: [permissions]}.
 * @param {*} roles The object describing a RBAC model.
 */
function generateRolesMap(roles) {
  return Object.keys(roles).reduce(
    (map, role) => ({ ...map, [role]: getPermissions(roles, role) }),
    {}
  );
}

module.exports = {
  /**
   * Sets up the RBAC map based on the input RBAC model.
   * The generated map is stored in the roles property
   * of this object.
   * @param {*} roles
   */
  init(roles) {
    this.roles = generateRolesMap(roles);
  },

  /**
   * Checks if the given role is authorized for the given action.
   * This function optionally receives a params object that can
   * be used as a parameter when evaluating permissions based on
   * functions (https://blog.nodeswat.com/implement-access-control-in-node-js-8567e7b484d1).
   *
   * If the provided role or the action do not exist, it evaluates
   * to false, i.e., to NOT AUTHORIZED (a fail-safe option).
   * @param {*} role
   * @param {*} action
   * @param {*} params
   */
  authorized(role, action, params = {}) {
    // Is the role defined
    if (!this.roles[role]) return false;

    // Is the role authorized for the given action
    if (typeof this.roles[role][action] === "string") {
      return true;
    } else if (typeof this.roles[role][action] === "function") {
      return this.roles[role][action](params);
    }

    // Fail-safe default: not authorized
    return false;
  }
};
