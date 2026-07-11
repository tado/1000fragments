uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.19) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 1.13 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.59 + sin(p.y * 3.73 + t * 1.41) * 4.88 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.01;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.21 - t * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(1.68) * q1;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 2.46, lr * 1.67 + time * 0.65); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q3 = fract(q3 * 2.80) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.58);
	float d3 = fieldC(q3, time, 1.39);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.18 + time * 0.26);
	col *= 0.86 + 0.16 * sin(gl_FragCoord.y * 2.42 + time * 6.62);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
