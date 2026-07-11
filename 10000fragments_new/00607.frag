uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.96 + t * 1.25 + ph) + sin(p.y * 13.05 - t * 1.25 + ph)
        + sin((p.x + p.y) * 8.33 + t * 1.25 + ph) + sin(length(p) * 17.60 - t * 1.25 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.48 + sr * 20.06 - t * 1.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.67;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.62, -0.29) * sin(length(q1) * 5.82 - time * 1.93) * 0.10;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.05, lr * 1.20 + time * -0.71); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.37);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.28, 0.83, 1.30) + vec3(0.15, 0.06, 0.11);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
