import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import QButtonBase from "../ui/q-button-base.vue";

describe("q-button-base", () => {
  it("variant applied", () => {
    // t2test
    const wrapper = mount(QButtonBase, {
      props: {
        variant: "secondary",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("button-base_secondary");
  });

  it("elevation applied", () => {
    // t2test
    const wrapper = mount(QButtonBase, {
      props: {
        variant: "primary",
        elevation: true,
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.classes()).toContain("state-layer_elevation");
  });

  it("disabled applied", () => {
    // t2test
    const wrapper = mount(QButtonBase, {
      props: {
        variant: "primary",
        disabled: true,
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.attributes("disabled")).toBeDefined();
  });

  it("type applied", () => {
    // t2test
    const wrapper = mount(QButtonBase, {
      props: {
        variant: "primary",
        type: "submit",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.attributes("type")).toBe("submit");
  });

  it("no content if no default slot", () => {
    // t2test
    const wrapper = mount(QButtonBase, {
      props: {
        variant: "primary",
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');

    expect(root.text().trim()).toBe("");
  });

  it("default slot is rendered", () => {
    // t2test
    const wrapper = mount(QButtonBase, {
      props: {
        variant: "primary",
      },
      slots: {
        default: '<span data-qt="q-button-base-slot">Press</span>',
      },
    });

    const root = wrapper.get('[data-qt="q-button-base-root"]');
    const slotContent = wrapper.get('[data-qt="q-button-base-slot"]');

    expect(slotContent.text()).toBe("Press");
    expect(root.text()).toContain("Press");
  });
});
