uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

void main() {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    float v = 0.0;
    v += sin(length(st - vec2(0.4318,0.7922)) * 17.0000 - time*2.6000);    v += sin(length(st - vec2(0.1014,0.5339)) * 18.0000 - time*2.8000);    v += sin(length(st - vec2(0.3057,0.0393)) * 19.0000 - time*3.0000);    v += sin(length(st - vec2(0.7269,0.3037)) * 20.0000 - time*3.2000);    v += sin(length(st - vec2(0.8424,0.7068)) * 21.0000 - time*3.4000);
    float n = v / 5.0000;
    n = n * 0.5 + 0.5;
    vec3 rgb = vec3(n*0.3, n*1.2, n*0.8);
    fragColor = TDOutputSwizzle(vec4(clamp(rgb, 0.0, 1.0), 1.0));
}