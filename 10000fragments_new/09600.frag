uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.94 + sr * 15.04 - t * 3.00 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.85 - t * 2.64 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(q1) + 0.001); float la = atan(q1.y, q1.x); q1 = vec2(la * 1.16, lr * 1.78 + time * 0.79); }
	q2 = fract(q2 * 1.24) - 0.5;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 1.80, lr * 2.67 + time * -0.81); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.99);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.44, 0.37, 0.24) * (0.18 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.33 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
