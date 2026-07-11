uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.64 + t * 3.61 + ph) + sin(p.y * 9.80 - t * 3.61 + ph)
        + sin((p.x + p.y) * 5.30 + t * 3.61 + ph) + sin(length(p) * 13.56 - t * 3.61 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.78; vec2 vi = floor(vp), vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 0.66 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	p = rot2(p.y * -3.57 + time * 0.21) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.57; p = rot2(1.56) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.62 * p.y + time * 1.89); p.y += 0.26 / wf * cos(wf * 3.38 * p.x + time * 1.71); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.09);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.11, vec3(0.54, 0.49, 0.47), vec3(0.33, 0.40, 0.39), vec3(0.76, 1.05, 1.03), vec3(0.25, 0.64, 0.29));
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
