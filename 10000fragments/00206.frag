uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.34 + t * 3.12 + ph) + sin(p.y * 9.09 - t * 4.42 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p = rot2(p.y * 1.76 + time * 0.36) * p;
	p = rot2(0.59) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.70 * p.y + time * 1.20); p.y += 0.27 / wf * cos(wf * 3.92 * p.x + time * 1.51); }
	{ float fr = length(p); p *= 1.0 + 0.42 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.47, 0.47, 0.05), vec3(0.80, 0.87, 0.95), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
