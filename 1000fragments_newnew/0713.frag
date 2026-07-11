uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.63 + vec2(t * 0.89, -t * 2.91) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.13 * cos(sa * 6.0 + t * 0.87 + ph);
    v = sin((sr - petal) * 8.60);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.81; }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.79, lr * 1.90 + (time * 0.67) * 0.32); }
	float d1 = fieldA(q1, (time * 0.67), 0.0);
	float d2 = fieldB(q2, (time * 0.67), 0.08);
	float d = d1 * d2;
	vec3 col = palette((d) * 1.19 + (time * 0.67) * 0.00, vec3(0.38, 0.30, 0.30), vec3(0.20, 0.19, 0.18), vec3(0.70, 0.50, 0.59), vec3(0.87, 0.50, 0.48));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.953, 1.028) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
