uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 35.33 - t * 2.50 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 16.44 - t * 2.50 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	{ p = vec2(atan(p.y, p.x) * 1.45, length(p) * 2.53 - time * 0.40); }
	p += vec2(0.25, 0.38) * sin(length(p) * 2.80 - time * 0.90) * 0.23;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.61 * p.y + time * 0.92); p.y += 0.22 / wf * cos(wf * 3.22 * p.x + time * 1.94); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.10));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
