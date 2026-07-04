uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.63 + vec2(t * 2.94, -t * 1.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.68 + vec2(t * 1.20, -t * 3.00) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.88, length(q1) * 4.10 - time * 0.90); }
	{ q2 = vec2(atan(q2.y, q2.x) * 1.86, length(q2) * 2.98 - time * 0.50); }
	q2 = rot2(length(q2) * -3.87 + time * 1.32) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.08);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.00));
	vec3 col = vec3(0.66, 0.94, 0.67) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
