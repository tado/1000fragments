uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.99 + t * 0.83 + ph) + sin(p.y * 11.63 - t * 0.83 + ph)
        + sin((p.x + p.y) * 7.89 + t * 0.83 + ph) + sin(length(p) * 11.05 - t * 0.83 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.77 * p.y + time * 0.84); p.y += 0.30 / wf * cos(wf * 3.37 * p.x + time * 0.84); }
	p = rot2(1.72) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(0.90) * p; }
	p *= 3.36;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.18, 0.32), vec3(0.87, 0.95, 0.55), d);
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
