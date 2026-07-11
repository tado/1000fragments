uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.06 + vec2(t * 1.33, -t * 1.21);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.40 + sin(p.y * 5.87 + t * 1.19) * 3.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.41, lr * 2.72 + (time * 0.67) * -0.24); }
	q1 = abs(q1) - 0.80;
	q2 += vec2(0.00, -0.75) * sin(length(q2) * 4.37 - (time * 0.67) * 1.34) * 0.17;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.90; }
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 0.99);
	float d = max(d1, d2);
	vec3 col = palette((d) * 0.45 + (time * 0.67) * 0.17, vec3(0.33, 0.39, 0.41), vec3(0.20, 0.12, 0.13), vec3(0.59, 0.64, 0.58), vec3(0.83, 0.68, 0.98));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.945, 0.999, 1.037) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
