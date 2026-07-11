uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 6.63;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 18.59 - t * 2.45 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.24 + vec2(t * 1.18, -t * 0.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.85; }
	q1 *= 2.16;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.49);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.40));
	vec3 col = palette(d * 1.29 + time * 0.31, vec3(0.45, 0.45, 0.45), vec3(0.41, 0.38, 0.32), vec3(0.72, 0.92, 1.38), vec3(0.91, 0.11, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
