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
    vec2 z = p * 1.10; vec2 jc = vec2(0.23 + 0.3 * sin(t * 0.53 + ph), 0.49 + 0.3 * cos(t * 0.53 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 25; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(25) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.49; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.32 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.51;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 2.14 * p.y + time * 1.67); p.y += 0.30 / wf * cos(wf * 1.66 * p.x + time * 1.93); }
	p += vec2(-0.26, 0.64) * sin(length(p) * 5.88 - time * 0.65) * 0.11;
	p *= 1.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = d1 * d2;
	vec3 col = palette(d * 0.82 + time * 0.13, vec3(0.53, 0.47, 0.53), vec3(0.48, 0.36, 0.48), vec3(1.36, 1.38, 1.01), vec3(0.18, 0.23, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
