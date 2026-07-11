uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 10.22 - t * 5.15 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 32.63 - t * 5.22 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 4.15;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 12.45 - t * 4.16 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.39 + t * 3.94 + ph) + sin(p.y * 14.48 - t * 3.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 21.4) + 0.5) / 21.4;
	{ float fr = length(q1); q1 *= 1.0 + -0.59 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d3 = fieldC(q3, time, 1.89);
	d2 = max(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.38 + time * 0.15, vec3(0.41, 0.54, 0.53), vec3(0.33, 0.50, 0.30), vec3(0.84, 0.71, 0.71), vec3(0.79, 0.76, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
