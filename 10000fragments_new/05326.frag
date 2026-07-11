uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.18 * cos(sa * 8.0 + t * 1.19 + ph);
    v = sin((sr - petal) * 8.06);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.19 + vec2(t * 1.00, -t * 1.98) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	vec2 q1 = p; vec2 q2 = p;
	q1 = abs(q1) - 0.69;
	q1 *= 1.87;
	q2 = (floor(q2 * 29.5) + 0.5) / 29.5;
	q2.y += sin(q2.x * 5.64 + time * 1.43) * 0.12;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.86);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.56 + time * 0.09);
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
