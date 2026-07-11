uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.43 + t * 3.03 + ph) + sin(p.y * 7.66 - t * 3.03 + ph)
        + sin((p.x + p.y) * 10.43 + t * 3.03 + ph) + sin(length(p) * 10.51 - t * 3.03 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 2.20; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.63 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 2.63 - time * 0.59); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.23, lr * 2.98 + time * -0.66); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.59);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.87 + time * 0.24, vec3(0.59, 0.40, 0.41), vec3(0.34, 0.42, 0.34), vec3(1.01, 1.34, 0.94), vec3(0.28, 0.89, 0.48));
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
