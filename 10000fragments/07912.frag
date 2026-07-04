uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.47, t * 0.86 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.17;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.37) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.96) * sin(3.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 2.23 * sin(t * 1.29) + t * 4.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.0 + 0.18 * sin(time * 3.37);
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.58, lr * 2.31 + time * 0.80); }
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 2.19));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.46);
	float d3 = fieldC(q3, time, 0.95);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = hue(d * 0.43 + time * 0.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
