uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.15, t * 1.08 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 30.98 - t * 1.54 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 33.30 - t * 7.06 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(1.52) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.52);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.16 + time * 0.29, vec3(0.55, 0.56, 0.55), vec3(0.40, 0.38, 0.48), vec3(1.16, 1.09, 1.15), vec3(0.55, 0.41, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
