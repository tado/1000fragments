uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.49) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.21 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.56; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.29 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.25; q1 = rot2(1.45) * q1; }
	{ float fr = length(q1); q1 *= 1.0 + 0.32 * fr * fr; }
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.72, lr * 2.88 + time * -0.95); }
	q2 = abs(q2) - 0.38;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.52);
	float d = max(d1, d2);
	vec3 col = vec3(0.23, 0.85, 0.57) * (0.11 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
