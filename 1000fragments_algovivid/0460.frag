uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.18 * jf)) * 0.85;
        xs += sin(length(p - im) * 214.83 - t * 9.48 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.65;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.62) * sin(7.0 * cp.y + ph)
             + sin(7.0 * cp.x - t * 1.99) * sin(4.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.09 + sin(p.y * 1.14 + t * 5.30) * 4.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.27;
	p = p.yx;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.44;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.39; q1 = rot2(1.88) * q1; }
	q2 = fract(q2 * 2.23) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.30 / wf * sin(wf * 3.20 * q2.y + (time * 0.79) * 1.96); q2.y += 0.32 / wf * cos(wf * 3.13 * q2.x + (time * 0.79) * 1.04); }
	float d1 = fieldA(q1, (time * 0.79), 0.0);
	float d2 = fieldB(q2, (time * 0.79), 1.29);
	float d3 = fieldC(q3, (time * 0.79), 0.38);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.79) * 1.42));
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.03, 0.10, 0.03), vec3(0.51, 0.65, 0.49), cc);
	col *= 0.90 + 0.19 * sin(gl_FragCoord.y * 1.63 + (time * 0.79) * 6.06);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.939, 0.964, 1.044) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
