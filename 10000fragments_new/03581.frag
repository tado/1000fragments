uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.82);
    float gsh = hash21(vec2(grow, floor(t * 4.48))) - 0.5;
    float gx = p.x + gsh * 1.07;
    v = sin(gx * 12.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.97));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.98 - t * 5.34 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.23, t * 2.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.68, lr * 1.03 + time * -0.59); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.16);
	float d3 = fieldC(q3, time, 1.50);
	d2 = max(d2, d3);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.02, 0.20), vec3(0.78, 0.91, 0.99), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
