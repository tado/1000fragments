uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.09 + t * 2.50 + ph) + sin(p.y * 9.12 - t * 2.50 + ph)
        + sin((p.x + p.y) * 9.92 + t * 2.50 + ph) + sin(length(p) * 14.91 - t * 2.50 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.53 + vec2(t * 1.22, -t * 0.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.32, length(q1) * 4.99 - time * 0.73); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ q2 = vec2(atan(q2.y, q2.x) * 2.29, length(q2) * 2.08 - time * 0.72); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.23);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.24));
	vec3 col = vec3(0.83, 0.17, 0.23) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
