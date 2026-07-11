uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.23 * cos(sa * 7.0 + t * 1.62 + ph);
    v = sin((sr - petal) * 19.47);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.95 + t * 1.01 + ph) * 0.7;
    float wb = sin(p.y * 16.64 - t * 2.88 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.75;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.26;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.44; }
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.54;
	float d1 = fieldA(q1, (time * 0.59), 0.0);
	float d2 = fieldB(q2, (time * 0.59), 0.59);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.12, 0.09), vec3(0.65, 0.63, 0.74), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 0.975, 1.027) * 1.00 + 0.041;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
