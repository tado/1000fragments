uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.83 + vec2(t * 1.19, -t * 1.42) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.13 + t * 5.08 + ph) + sin(p.y * 3.32 - t * 0.87 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.79;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.59) - 0.5;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.83, length(q1) * 2.63 - time * 0.79); }
	q2 += vec2(0.29, 0.98) * sin(length(q2) * 3.39 - time * 1.12) * 0.38;
	q2 = rot2(2.67) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.50);
	float d = d1 * d2;
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.35, 0.20), vec3(0.66, 0.57, 0.62), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
