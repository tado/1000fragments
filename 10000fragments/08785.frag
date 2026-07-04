uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.11 * cos(sa * 3.0 + t * 2.14 + ph);
    v = sin((sr - petal) * 9.29);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.76 + vec2(t * 1.69, -t * 2.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.73) - 0.5;
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.95; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.34);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.64 + time * 0.19, vec3(0.46, 0.50, 0.46), vec3(0.40, 0.34, 0.39), vec3(0.79, 1.34, 1.39), vec3(0.85, 0.04, 0.20));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
