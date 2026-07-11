uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.17, t * 0.89 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.32 * pow(abs(cos(ra * 2.0 + t * 1.08)), 1.77);
    v = sin((rr - pet) * 11.85 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec2 q1 = p; vec2 q2 = p;
	q2 *= 2.44;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.71);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.05));
	vec3 col = palette(d * 0.68 + time * 0.23, vec3(0.56, 0.47, 0.49), vec3(0.43, 0.44, 0.47), vec3(0.82, 1.37, 0.71), vec3(0.46, 0.56, 0.10));
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 1.95 + time * 4.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
