uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.49 - t * 8.18 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.25 + jf * 4.0), cos(t * 0.32 * jf)) * 0.52;
        xs += sin(length(p - im) * 145.04 - t * 13.78 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.88 + sr * 10.11 - t * 1.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.83;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 1.29, length(q1) * 3.75 - time * 0.28); }
	q2 *= 1.59;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.15, length(q2) * 4.83 - time * 0.67); }
	q3 *= 1.0 + 0.27 * sin(time * 1.96);
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.59);
	float d3 = fieldC(q3, time, 0.08);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 4.50 + time * 0.87);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.55 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
