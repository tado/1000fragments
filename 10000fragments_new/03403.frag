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
    vec2 vp = p * 6.81; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.55 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.47 / wf * sin(wf * 3.58 * p.y + time * 1.99); p.y += 0.39 / wf * cos(wf * 3.14 * p.x + time * 1.54); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(1.22) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.09, vec3(0.44, 0.44, 0.46), vec3(0.49, 0.50, 0.32), vec3(1.10, 0.93, 1.05), vec3(0.24, 0.87, 0.31));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
