uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.95 + sin(p.y * 4.53 + t * 4.54) * 2.34 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.32 + vec2(t * 2.02, -t * 2.61) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(2.27) * q2;
	q2 = fract(q2 * 2.66) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.30);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.93 + time * 0.42);
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
