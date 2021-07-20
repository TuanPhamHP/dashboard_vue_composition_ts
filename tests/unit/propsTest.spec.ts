import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify);
describe("HelloWorld", () => {
 it("renders props.paginationSync when passed", () => {
  const paginationSync = {
   total: 1,
   per_page: 15,
   total_pages: 15,
   current_page: 1,
  };
  const wrapper = shallowMount(HelloWorld, {
   propsData: { paginationSync },
  });
  console.log(wrapper);
  expect(wrapper.props().paginationSync).toStrictEqual({
   total: 1,
   per_page: 15,
   total_pages: 15,
   current_page: 1,
  });
 });
});
