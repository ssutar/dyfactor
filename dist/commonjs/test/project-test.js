"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dyfactor_1 = require("dyfactor");
let cwd = process.cwd();
QUnit.module('Project', {
    beforeEach() {
        process.chdir(`${process.cwd()}/test/fixtures/project`);
    },
    afterEach() {
        process.chdir(cwd);
    }
});
QUnit.test('Cannot create a project if missing .dyfactor.json', assert => {
    process.chdir(`../project-missing-dyfactor`);
    assert.throws(() => {
        new dyfactor_1.ProjectImpl();
    }, '.dyfactor.json not found in the root of the project. Please run `dyfactor init`.');
});
QUnit.test('aggregates plugins by name', assert => {
    let project = new dyfactor_1.ProjectImpl();
    assert.deepEqual(project.plugins, {
        a: {
            packageName: 'plugin-a',
            name: 'a',
            type: 'javascript',
            levels: ['extract', 'modify']
        },
        b: {
            packageName: 'plugin-b',
            name: 'b',
            type: 'template',
            levels: ['modify']
        }
    });
});
QUnit.test('aggregates plugins by types', assert => {
    let project = new dyfactor_1.ProjectImpl();
    assert.deepEqual(project.pluginsByType(), {
        javascript: [
            {
                packageName: 'plugin-a',
                name: 'a',
                type: 'javascript',
                levels: ['extract', 'modify']
            }
        ],
        template: [
            {
                packageName: 'plugin-b',
                name: 'b',
                type: 'template',
                levels: ['modify']
            }
        ]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC10ZXN0LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9zc3V0YXIvbGktc3JjL2R5ZmFjdG9yLyIsInNvdXJjZXMiOlsidGVzdC9wcm9qZWN0LXRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFFdkMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO0lBQ3RCLFVBQVU7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxTQUFTO1FBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLElBQUksQ0FBQyxtREFBbUQsRUFBRSxNQUFNLENBQUMsRUFBRTtJQUN2RSxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7UUFDakIsSUFBSSxzQkFBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQyxFQUFFLGtGQUFrRixDQUFDLENBQUM7QUFDekYsQ0FBQyxDQUFDLENBQUM7QUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLE1BQU0sQ0FBQyxFQUFFO0lBQ2hELElBQUksT0FBTyxHQUFHLElBQUksc0JBQVcsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNoQyxDQUFDLEVBQUU7WUFDRCxXQUFXLEVBQUUsVUFBVTtZQUN2QixJQUFJLEVBQUUsR0FBRztZQUNULElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7U0FDOUI7UUFDRCxDQUFDLEVBQUU7WUFDRCxXQUFXLEVBQUUsVUFBVTtZQUN2QixJQUFJLEVBQUUsR0FBRztZQUNULElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUNuQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsS0FBSyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxNQUFNLENBQUMsRUFBRTtJQUNqRCxJQUFJLE9BQU8sR0FBRyxJQUFJLHNCQUFXLEVBQUUsQ0FBQztJQUNoQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRTtRQUN4QyxVQUFVLEVBQUU7WUFDVjtnQkFDRSxXQUFXLEVBQUUsVUFBVTtnQkFDdkIsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7YUFDOUI7U0FDRjtRQUNELFFBQVEsRUFBRTtZQUNSO2dCQUNFLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixJQUFJLEVBQUUsR0FBRztnQkFDVCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ25CO1NBQ0Y7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2plY3RJbXBsIH0gZnJvbSAnZHlmYWN0b3InO1xuXG5sZXQgY3dkID0gcHJvY2Vzcy5jd2QoKTtcblFVbml0Lm1vZHVsZSgnUHJvamVjdCcsIHtcbiAgYmVmb3JlRWFjaCgpIHtcbiAgICBwcm9jZXNzLmNoZGlyKGAke3Byb2Nlc3MuY3dkKCl9L3Rlc3QvZml4dHVyZXMvcHJvamVjdGApO1xuICB9LFxuICBhZnRlckVhY2goKSB7XG4gICAgcHJvY2Vzcy5jaGRpcihjd2QpO1xuICB9XG59KTtcblxuUVVuaXQudGVzdCgnQ2Fubm90IGNyZWF0ZSBhIHByb2plY3QgaWYgbWlzc2luZyAuZHlmYWN0b3IuanNvbicsIGFzc2VydCA9PiB7XG4gIHByb2Nlc3MuY2hkaXIoYC4uL3Byb2plY3QtbWlzc2luZy1keWZhY3RvcmApO1xuICBhc3NlcnQudGhyb3dzKCgpID0+IHtcbiAgICBuZXcgUHJvamVjdEltcGwoKTtcbiAgfSwgJy5keWZhY3Rvci5qc29uIG5vdCBmb3VuZCBpbiB0aGUgcm9vdCBvZiB0aGUgcHJvamVjdC4gUGxlYXNlIHJ1biBgZHlmYWN0b3IgaW5pdGAuJyk7XG59KTtcblxuUVVuaXQudGVzdCgnYWdncmVnYXRlcyBwbHVnaW5zIGJ5IG5hbWUnLCBhc3NlcnQgPT4ge1xuICBsZXQgcHJvamVjdCA9IG5ldyBQcm9qZWN0SW1wbCgpO1xuICBhc3NlcnQuZGVlcEVxdWFsKHByb2plY3QucGx1Z2lucywge1xuICAgIGE6IHtcbiAgICAgIHBhY2thZ2VOYW1lOiAncGx1Z2luLWEnLFxuICAgICAgbmFtZTogJ2EnLFxuICAgICAgdHlwZTogJ2phdmFzY3JpcHQnLFxuICAgICAgbGV2ZWxzOiBbJ2V4dHJhY3QnLCAnbW9kaWZ5J11cbiAgICB9LFxuICAgIGI6IHtcbiAgICAgIHBhY2thZ2VOYW1lOiAncGx1Z2luLWInLFxuICAgICAgbmFtZTogJ2InLFxuICAgICAgdHlwZTogJ3RlbXBsYXRlJyxcbiAgICAgIGxldmVsczogWydtb2RpZnknXVxuICAgIH1cbiAgfSk7XG59KTtcblxuUVVuaXQudGVzdCgnYWdncmVnYXRlcyBwbHVnaW5zIGJ5IHR5cGVzJywgYXNzZXJ0ID0+IHtcbiAgbGV0IHByb2plY3QgPSBuZXcgUHJvamVjdEltcGwoKTtcbiAgYXNzZXJ0LmRlZXBFcXVhbChwcm9qZWN0LnBsdWdpbnNCeVR5cGUoKSwge1xuICAgIGphdmFzY3JpcHQ6IFtcbiAgICAgIHtcbiAgICAgICAgcGFja2FnZU5hbWU6ICdwbHVnaW4tYScsXG4gICAgICAgIG5hbWU6ICdhJyxcbiAgICAgICAgdHlwZTogJ2phdmFzY3JpcHQnLFxuICAgICAgICBsZXZlbHM6IFsnZXh0cmFjdCcsICdtb2RpZnknXVxuICAgICAgfVxuICAgIF0sXG4gICAgdGVtcGxhdGU6IFtcbiAgICAgIHtcbiAgICAgICAgcGFja2FnZU5hbWU6ICdwbHVnaW4tYicsXG4gICAgICAgIG5hbWU6ICdiJyxcbiAgICAgICAgdHlwZTogJ3RlbXBsYXRlJyxcbiAgICAgICAgbGV2ZWxzOiBbJ21vZGlmeSddXG4gICAgICB9XG4gICAgXVxuICB9KTtcbn0pO1xuIl19