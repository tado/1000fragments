uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.50 + sr * 11.30 - t * 4.91 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.65, t * 1.67 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + 0.27 * fr * fr; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q1.x += 0.40 / wf * sin(wf * 2.71 * q1.y + time * 0.97); q1.y += 0.24 / wf * cos(wf * 1.83 * q1.x + time * 2.09); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.66);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.31, vec3(0.53, 0.45, 0.47), vec3(0.49, 0.45, 0.37), vec3(1.15, 1.15, 0.79), vec3(0.56, 0.43, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
