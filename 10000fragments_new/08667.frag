uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.46, t * 0.48 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 9.13);
    float gsh = hash21(vec2(grow, floor(t * 7.33))) - 0.5;
    float gx = p.x + gsh * 1.15;
    v = sin(gx * 10.56 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.62));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 2.76 + time * 0.67) * q1;
	q2 *= 1.84;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.24, lr * 2.30 + time * -0.92); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.11);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 1.00, 1.33) + vec3(0.13, 0.08, 0.21);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
