uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.49 + t * 0.95 + ph) * 0.7;
    float wb = sin(p.y * 11.84 - t * 0.74 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.46;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.12 + sin(p.y * 4.41 + t * 4.62) * 3.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(length(q1) * 1.38 + time * 0.82) * q1;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 += vec2(0.97, -0.44) * sin(length(q2) * 5.88 - time * 0.93) * 0.34;
	{ float fr = length(q2); q2 *= 1.0 + 0.47 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.73);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.90 + time * 0.78);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 1.91 + time * 10.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
