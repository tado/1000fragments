uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.01 + t * 1.11 + ph) + sin(p.y * 16.44 - t * 1.57 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.39, t * 1.35 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -3.00 + time * 1.17) * q1;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.51;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.20);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.42 + time * 0.24, vec3(0.55, 0.56, 0.57), vec3(0.45, 0.46, 0.41), vec3(0.89, 1.08, 0.74), vec3(0.39, 0.57, 0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
