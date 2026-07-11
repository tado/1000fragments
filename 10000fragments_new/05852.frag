uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.23 * cos(sa * 9.0 + t * 0.64 + ph);
    v = sin((sr - petal) * 7.74);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.49 - t * 8.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.91;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.49 / wf * sin(wf * 1.65 * q2.y + time * 0.99); q2.y += 0.48 / wf * cos(wf * 3.80 * q2.x + time * 1.03); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.43);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.33 + time * 0.34, vec3(0.44, 0.46, 0.53), vec3(0.42, 0.48, 0.47), vec3(0.86, 0.86, 1.01), vec3(0.20, 0.62, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
