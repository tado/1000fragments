uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.23 + t * 2.27 + ph) + sin(p.y * 3.66 - t * 2.27 + ph)
        + sin((p.x + p.y) * 4.59 + t * 2.27 + ph) + sin(length(p) * 8.09 - t * 2.27 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.20 + sin(p.y * 5.82 + t * 3.68) * 1.77 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.19 + jf * 4.0), cos(t * 0.54 * jf)) * 0.81;
        xs += sin(length(p - im) * 122.39 - t * 11.60 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.28, length(q1) * 5.66 - time * 0.48); }
	q2 = rot2(1.63) * q2;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q2.x += 0.31 / wf * sin(wf * 3.07 * q2.y + time * 1.63); q2.y += 0.20 / wf * cos(wf * 2.27 * q2.x + time * 1.64); }
	q3 = rot2(time * -1.21) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.12);
	float d3 = fieldC(q3, time, 1.80);
	d2 = 0.5 * (d2 + d3);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.41 + time * 0.24);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.06 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
