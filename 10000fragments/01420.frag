uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.11 - t * 6.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.54 * p.y + time * 0.70); p.y += 0.35 / wf * cos(wf * 2.06 * p.x + time * 1.63); }
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.34; p = rot2(1.10) * p; }
	p = rot2(2.19) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.16));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.51, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
