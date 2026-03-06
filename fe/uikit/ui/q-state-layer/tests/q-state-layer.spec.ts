import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import QStateLayer from "../ui/q-state-layer.vue";

it("no error is thrown", () => {
  expect(() =>
    mount(QStateLayer, {
      attrs: {
        "data-qt": "q-state-layer-root",
      },
    }),
  ).not.toThrow();
});

it("as works", () => {
  const wrapper = mount(QStateLayer, {
    props: {
      as: "button",
    },
    attrs: {
      "data-qt": "q-state-layer-root",
    },
  });

  const root = wrapper.get('[data-qt="q-state-layer-root"]');

  expect(root.element.tagName).toBe("BUTTON");
});

it("as-child works", () => {
  const wrapper = mount(QStateLayer, {
    props: {
      asChild: true,
    },
    attrs: {
      "data-qt": "q-state-layer-root",
    },
    slots: {
      default: "<button>Action</button>",
    },
  });

  const root = wrapper.get('[data-qt="q-state-layer-root"]');

  expect(root.element.tagName).toBe("BUTTON");
  expect(root.text()).toContain("Action");
});

it("elevation works", () => {
  const wrapper = mount(QStateLayer, {
    props: {
      elevation: true,
    },
    attrs: {
      "data-qt": "q-state-layer-root",
    },
  });

  const root = wrapper.get('[data-qt="q-state-layer-root"]');

  expect(root.classes()).toContain("state-layer_elevation");
});

describe("disabled", () => {
  it("disable works", () => {
    const wrapper = mount(QStateLayer, {
      props: {
        disabled: true,
      },
      attrs: {
        "data-qt": "q-state-layer-root",
      },
    });

    const root = wrapper.get('[data-qt="q-state-layer-root"]');

    expect(root.classes()).toContain("state-layer_disabled");
  });

  it("no layer if disabled", () => {
    const wrapper = mount(QStateLayer, {
      props: {
        disabled: true,
      },
      attrs: {
        "data-qt": "q-state-layer-root",
      },
    });

    const root = wrapper.get('[data-qt="q-state-layer-root"]');
    const afterDisplay = globalThis.getComputedStyle(root.element, "::after").display;

    expect(root.classes()).toContain("state-layer_disabled");
    expect(["none", ""]).toContain(afterDisplay);
  });
});

it("slot default work", () => {
  const wrapper = mount(QStateLayer, {
    attrs: {
      "data-qt": "q-state-layer-root",
    },
    slots: {
      default: '<span data-qt="q-state-layer-slot">Layer content</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-state-layer-root"]');
  const content = wrapper.get('[data-qt="q-state-layer-slot"]');

  expect(content.text()).toBe("Layer content");
  expect(root.text()).toContain("Layer content");
});

it("takes size of slot content", () => {
  const wrapper = mount({
    components: {
      QStateLayer,
    },
    template: `
      <div>
        <QStateLayer as-child>
          <div data-qt="q-state-layer-size-1" style="width: 40px; height: 16px;">XS</div>
        </QStateLayer>
        <QStateLayer as-child>
          <div data-qt="q-state-layer-size-2" style="width: 80px; height: 24px;">M</div>
        </QStateLayer>
        <QStateLayer as-child>
          <div data-qt="q-state-layer-size-3" style="width: 120px; height: 32px;">XL</div>
        </QStateLayer>
      </div>
    `,
  });

  const first = wrapper.get('[data-qt="q-state-layer-size-1"]');
  const second = wrapper.get('[data-qt="q-state-layer-size-2"]');
  const third = wrapper.get('[data-qt="q-state-layer-size-3"]');

  expect(first.classes()).toContain("state-layer");
  expect(second.classes()).toContain("state-layer");
  expect(third.classes()).toContain("state-layer");

  expect(first.element.style.width).toBe("40px");
  expect(first.element.style.height).toBe("16px");
  expect(second.element.style.width).toBe("80px");
  expect(second.element.style.height).toBe("24px");
  expect(third.element.style.width).toBe("120px");
  expect(third.element.style.height).toBe("32px");
});
