uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    st.x *= resolution.x / resolution.y;
    float val = 0.0;
    val += sin(length(st - vec2(0.1169,0.6150))*21.2000 - time*7.9000 + 0.0000);
    val += sin(length(st - vec2(0.2722,0.1712))*21.2000 - time*8.4000 + 1.0470);
    val += sin(length(st - vec2(0.7424,0.1818))*21.2000 - time*8.9000 + 2.0940);
    val += sin(length(st - vec2(0.8775,0.6322))*21.2000 - time*9.4000 + 3.1410);
    val += sin(length(st - vec2(0.4910,0.8999))*21.2000 - time*9.9000 + 4.1880);
    val /= 5.0000;
    float v = val * 0.5 + 0.5;
    vec3 rgb = vec3(v, v*0.1, 1.0-v);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}