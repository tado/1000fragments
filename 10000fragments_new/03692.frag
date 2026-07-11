uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.15, t * 1.73 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.44 + t * 2.50 + ph) + sin(p.y * 5.97 - t * 2.50 + ph)
        + sin((p.x + p.y) * 4.92 + t * 2.50 + ph) + sin(length(p) * 9.30 - t * 2.50 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.32 * fr * fr; }
	q1 = rot2(2.74) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.36 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.06);
	float d = max(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.19, 0.19), vec3(0.57, 0.56, 0.73), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
