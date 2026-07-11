uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.72) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.96 - t * 7.74 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.23;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 16.25 - t * 5.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * -0.51) * q1;
	q1 *= 1.39;
	{ float fr = length(q3); q3 *= 1.0 + 0.23 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.28);
	float d3 = fieldC(q3, time, 0.69);
	d2 = d2 * d3;
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.38 + time * 0.92);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
