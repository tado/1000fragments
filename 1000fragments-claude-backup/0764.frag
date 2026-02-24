uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.7763,0.6168)) * 10.0000 - time*2.6000);    v += sin(length(st - vec2(0.5493,0.8969)) * 11.0000 - time*2.8000);    v += sin(length(st - vec2(0.1011,0.8015)) * 12.0000 - time*3.0000);    v += sin(length(st - vec2(0.2237,0.3832)) * 13.0000 - time*3.2000);    v += sin(length(st - vec2(0.4507,0.1031)) * 14.0000 - time*3.4000);    v += sin(length(st - vec2(0.8989,0.1985)) * 15.0000 - time*3.6000);
    float n = v / 6.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*2.5, n*0.4, n*3.0);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}