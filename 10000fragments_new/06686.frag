uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.28, t * 0.96 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.33 + t * 4.73 + ph) + sin(p.y * 2.30 - t * 1.76 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.28 + vec2(t * 1.92, -t * 1.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.95;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.34, lr * 2.38 + time * 0.45); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.53);
	float d3 = fieldC(q3, time, 0.39);
	d2 = abs(d2 - d3);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.05 + time * 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
