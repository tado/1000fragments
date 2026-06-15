uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 17.29 - t * 6.04 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.55;
	{ p = vec2(atan(p.y, p.x) * 1.49, length(p) * 4.90 - time * 0.73); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.20; p = rot2(1.63) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.83 * p.y + time * 0.65); p.y += 0.44 / wf * cos(wf * 3.07 * p.x + time * 1.15); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.99, 1.19, 1.50) + vec3(0.10, 0.26, 0.29);
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
