uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.29 + t * 2.15 + ph) + sin(p.y * 15.70 - t * 2.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.37 * p.y + time * 1.75); p.y += 0.21 / wf * cos(wf * 2.18 * p.x + time * 1.37); }
	p = rot2(length(p) * -1.52 + time * 0.40) * p;
	p = rot2(2.87) * p;
	{ float fr = length(p); p *= 1.0 + 0.75 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.26, 0.43, 0.02), vec3(0.51, 0.63, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
