import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import QButtonContent from "../ui/q-button-content.vue";

describe("q-button-content", () => {
  it("text via prop rendered correct ", () => {
    // t2test
    const wrapper = mount(QButtonContent, {
      props: {
        text: "Continue",
      },
    });

    const root = wrapper.get('[data-qt="q-button-content-root"]');
    const text = wrapper.get('[data-qt="q-button-content-text"]');

    expect(text.text()).toBe("Continue");
    expect(root.text()).toContain("Continue");
  });

  it("default slot replaces all content", () => {
    // t2test
    const wrapper = mount(QButtonContent, {
      props: {
        text: "Continue",
      },
      slots: {
        default: '<span data-qt="q-button-content-default">Custom</span>',
      },
    });

    const root = wrapper.get('[data-qt="q-button-content-root"]');
    const slotContent = wrapper.get('[data-qt="q-button-content-default"]');

    expect(slotContent.text()).toBe("Custom");
    expect(root.text()).toContain("Custom");
    expect(root.text()).not.toContain("Continue");
    expect(wrapper.find('[data-qt="q-button-content-text"]').exists()).toBe(false);
  });

  it("prepend slot adds extra content and keeps text", () => {
    // t2test
    const wrapper = mount(QButtonContent, {
      props: {
        text: "Continue",
      },
      slots: {
        prepend: '<span data-qt="q-button-content-prepend">Icon</span>',
      },
    });

    const root = wrapper.get('[data-qt="q-button-content-root"]');
    const prepend = wrapper.get('[data-qt="q-button-content-prepend"]');
    const text = wrapper.get('[data-qt="q-button-content-text"]');

    expect(prepend.text()).toBe("Icon");
    expect(text.text()).toBe("Continue");
    expect(root.text()).toContain("Icon");
    expect(root.text()).toContain("Continue");
  });
});
