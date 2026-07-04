uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.17 + t * 0.57 + ph) * 0.7;
    float wb = sin(p.y * 8.61 - t * 3.91 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.26;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.88, t * 0.54 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * -2.05 + time * 1.07) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.36);
	float d = d1 * d2;
	vec3 col = palette(d * 1.25 + time * 0.10, vec3(0.56, 0.46, 0.43), vec3(0.45, 0.47, 0.41), vec3(0.89, 0.71, 1.03), vec3(0.48, 0.40, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
