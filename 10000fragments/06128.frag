uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.35 + ga * 5.0 - t * 2.03 + ph);
    v = arm * exp(-gr * 0.58);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.85 - t * 0.37;
    v = sin(floor(lv * 4.1) / 4.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q1 = sin(q1 * 2.41 + time * 0.91) * 1.37;
	{ float lr = log(length(q2) + 0.001); float la = atan(q2.y, q2.x); q2 = vec2(la * 2.13, lr * 2.69 + time * -0.48); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.98, length(q2) * 2.36 - time * 0.63); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.74);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.44));
	vec3 col = palette(d * 1.03 + time * 0.39, vec3(0.41, 0.54, 0.51), vec3(0.34, 0.34, 0.39), vec3(1.37, 1.37, 1.34), vec3(0.06, 0.76, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
