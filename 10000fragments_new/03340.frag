uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.25 * pow(abs(cos(ra * 2.0 + t * 1.61)), 2.92);
    v = sin((rr - pet) * 10.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.90;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.54 * p.y + time * 1.69); p.y += 0.47 / wf * cos(wf * 2.08 * p.x + time * 0.68); }
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 16.0) + 0.5) / 16.0;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.82));
	col = 0.5 + 0.5 * col;
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.70 + time * 12.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
