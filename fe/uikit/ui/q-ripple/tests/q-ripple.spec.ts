import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import QRipple from "../ui/q-ripple.vue";

it("no error is thrown", () => {
  expect(() =>
    mount(QRipple, {
      attrs: {
        "data-qt": "q-ripple-root",
      },
    }),
  ).not.toThrow();
});

it("as works", () => {
  const wrapper = mount(QRipple, {
    props: {
      as: "button",
    },
    attrs: {
      "data-qt": "q-ripple-root",
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');

  expect(root.element.tagName).toBe("BUTTON");
});

it("as-child works", () => {
  const wrapper = mount(QRipple, {
    props: {
      asChild: true,
    },
    slots: {
      default: '<button data-qt="q-ripple-slot">Action</button>',
    },
  });

  const slot = wrapper.get('[data-qt="q-ripple-slot"]');

  expect(slot.element.tagName).toBe("BUTTON");
  expect(slot.classes()).toContain("ripple");
  expect(slot.text()).toBe("Action");
});

it("centered works", async () => {
  const wrapper = mount(QRipple, {
    props: {
      centered: true,
    },
    attrs: {
      "data-qt": "q-ripple-root",
    },
    slots: {
      default: '<span data-qt="q-ripple-content">Tap</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');

  Object.defineProperty(root.element, "getBoundingClientRect", {
    value: () => ({
      x: 10,
      y: 20,
      width: 120,
      height: 80,
      top: 20,
      right: 130,
      bottom: 100,
      left: 10,
      toJSON: () => ({}),
    }),
  });

  await root.trigger("pointerdown", {
    button: 0,
    clientX: 110,
    clientY: 90,
  });

  const effect = wrapper.get<HTMLElement>('[data-qt="q-ripple-effect"]');

  expect(effect.element.style.left).toBe("60px");
  expect(effect.element.style.top).toBe("40px");
});

it("duration works", async () => {
  const wrapper = mount(QRipple, {
    props: {
      duration: 900,
    },
    attrs: {
      "data-qt": "q-ripple-root",
    },
    slots: {
      default: '<span data-qt="q-ripple-content">Tap</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');

  Object.defineProperty(root.element, "getBoundingClientRect", {
    value: () => ({
      x: 0,
      y: 0,
      width: 60,
      height: 40,
      top: 0,
      right: 60,
      bottom: 40,
      left: 0,
      toJSON: () => ({}),
    }),
  });

  await root.trigger("pointerdown", {
    button: 0,
    clientX: 20,
    clientY: 20,
  });

  const effect = wrapper.get<HTMLElement>('[data-qt="q-ripple-effect"]');

  expect(effect.element.style.animationDuration).toBe("900ms");
});

it("maxEffects works", async () => {
  const wrapper = mount(QRipple, {
    props: {
      maxEffects: 2,
      trigger: "click",
    },
    attrs: {
      "data-qt": "q-ripple-root",
    },
    slots: {
      default: '<span data-qt="q-ripple-content">Tap</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');

  Object.defineProperty(root.element, "getBoundingClientRect", {
    value: () => ({
      x: 0,
      y: 0,
      width: 80,
      height: 80,
      top: 0,
      right: 80,
      bottom: 80,
      left: 0,
      toJSON: () => ({}),
    }),
  });

  await root.trigger("click", { button: 0, clientX: 10, clientY: 10 });
  await root.trigger("click", { button: 0, clientX: 20, clientY: 20 });
  await root.trigger("click", { button: 0, clientX: 30, clientY: 30 });

  const effects = wrapper.findAll('[data-qt="q-ripple-effect"]');

  expect(effects).toHaveLength(2);
});

it("trigger works", async () => {
  const wrapper = mount(QRipple, {
    props: {
      trigger: "click",
    },
    attrs: {
      "data-qt": "q-ripple-root",
    },
    slots: {
      default: '<span data-qt="q-ripple-content">Tap</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');

  Object.defineProperty(root.element, "getBoundingClientRect", {
    value: () => ({
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      top: 0,
      right: 50,
      bottom: 50,
      left: 0,
      toJSON: () => ({}),
    }),
  });

  await root.trigger("pointerdown", {
    button: 0,
    clientX: 20,
    clientY: 20,
  });

  expect(wrapper.find('[data-qt="q-ripple-effect"]').exists()).toBe(false);

  await root.trigger("click", {
    button: 0,
    clientX: 20,
    clientY: 20,
  });

  expect(wrapper.find('[data-qt="q-ripple-effect"]').exists()).toBe(true);
});

it("opacity works", async () => {
  const wrapper = mount(QRipple, {
    props: {
      opacity: "0.2",
    },
    attrs: {
      "data-qt": "q-ripple-root",
    },
    slots: {
      default: '<span data-qt="q-ripple-content">Tap</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');

  Object.defineProperty(root.element, "getBoundingClientRect", {
    value: () => ({
      x: 0,
      y: 0,
      width: 60,
      height: 60,
      top: 0,
      right: 60,
      bottom: 60,
      left: 0,
      toJSON: () => ({}),
    }),
  });

  await root.trigger("pointerdown", {
    button: 0,
    clientX: 10,
    clientY: 10,
  });

  const effect = wrapper.get<HTMLElement>('[data-qt="q-ripple-effect"]');

  expect(effect.element.style.opacity).toBe("0.2");
});

it("default slot content is rendered", () => {
  const wrapper = mount(QRipple, {
    attrs: {
      "data-qt": "q-ripple-root",
    },
    slots: {
      default: '<span data-qt="q-ripple-slot">Ripple content</span>',
    },
  });

  const root = wrapper.get('[data-qt="q-ripple-root"]');
  const slot = wrapper.get('[data-qt="q-ripple-slot"]');

  expect(slot.text()).toBe("Ripple content");
  expect(root.text()).toContain("Ripple content");
});

describe("ripple effect", () => {
  it("one instance is shown per one click", async () => {
    const wrapper = mount(QRipple, {
      props: {
        trigger: "click",
      },
      attrs: {
        "data-qt": "q-ripple-root",
      },
      slots: {
        default: '<span data-qt="q-ripple-content">Tap</span>',
      },
    });

    const root = wrapper.get('[data-qt="q-ripple-root"]');

    Object.defineProperty(root.element, "getBoundingClientRect", {
      value: () => ({
        x: 0,
        y: 0,
        width: 80,
        height: 40,
        top: 0,
        right: 80,
        bottom: 40,
        left: 0,
        toJSON: () => ({}),
      }),
    });

    await root.trigger("click", { button: 0, clientX: 10, clientY: 10 });

    const effects = wrapper.findAll('[data-qt="q-ripple-effect"]');

    expect(effects).toHaveLength(1);
  });

  it("3 instaces are shown per 3 clicks", async () => {
    const wrapper = mount(QRipple, {
      props: {
        trigger: "click",
      },
      attrs: {
        "data-qt": "q-ripple-root",
      },
      slots: {
        default: '<span data-qt="q-ripple-content">Tap</span>',
      },
    });

    const root = wrapper.get('[data-qt="q-ripple-root"]');

    Object.defineProperty(root.element, "getBoundingClientRect", {
      value: () => ({
        x: 0,
        y: 0,
        width: 80,
        height: 40,
        top: 0,
        right: 80,
        bottom: 40,
        left: 0,
        toJSON: () => ({}),
      }),
    });

    await root.trigger("click", { button: 0, clientX: 10, clientY: 10 });
    await root.trigger("click", { button: 0, clientX: 20, clientY: 20 });
    await root.trigger("click", { button: 0, clientX: 30, clientY: 30 });

    const effects = wrapper.findAll('[data-qt="q-ripple-effect"]');

    expect(effects).toHaveLength(3);
  });
});

it("takes size of slot content", () => {
  const wrapper = mount({
    components: {
      QRipple,
    },
    template: `
      <div>
        <QRipple as-child>
          <div data-qt="q-ripple-size-1" style="width: 40px; height: 16px;">XS</div>
        </QRipple>
        <QRipple as-child>
          <div data-qt="q-ripple-size-2" style="width: 80px; height: 24px;">M</div>
        </QRipple>
        <QRipple as-child>
          <div data-qt="q-ripple-size-3" style="width: 120px; height: 32px;">XL</div>
        </QRipple>
      </div>
    `,
  });

  const first = wrapper.get<HTMLElement>('[data-qt="q-ripple-size-1"]');
  const second = wrapper.get<HTMLElement>('[data-qt="q-ripple-size-2"]');
  const third = wrapper.get<HTMLElement>('[data-qt="q-ripple-size-3"]');

  expect(first.classes()).toContain("ripple");
  expect(second.classes()).toContain("ripple");
  expect(third.classes()).toContain("ripple");

  expect(first.element.style.width).toBe("40px");
  expect(first.element.style.height).toBe("16px");
  expect(second.element.style.width).toBe("80px");
  expect(second.element.style.height).toBe("24px");
  expect(third.element.style.width).toBe("120px");
  expect(third.element.style.height).toBe("32px");
});
