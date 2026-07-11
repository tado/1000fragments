uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.03);
    float gsh = hash21(vec2(grow, floor(t * 5.56))) - 0.5;
    float gx = p.x + gsh * 0.74;
    v = sin(gx * 10.29 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.14));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.71 + t * 2.69 + ph) + sin(p.y * 2.56 - t * 2.69 + ph)
        + sin((p.x + p.y) * 10.04 + t * 2.69 + ph) + sin(length(p) * 14.20 - t * 2.69 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.98; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.63 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.50 * fr * fr; }
	q2 = rot2(time * -1.54) * q2;
	for(int fo = 0; fo < 2; fo++){ q3 = abs(q3) - 0.59; q3 = rot2(0.60) * q3; }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.79);
	float d3 = fieldC(q3, time, 0.68);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.88, 0.28, 0.24) * (0.12 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.96 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
