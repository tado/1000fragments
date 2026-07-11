uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.37 + sin(p.y * 4.00 + t * 0.70) * 3.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p = rot2(time * -1.00) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 3.75 * p.y + time * 1.10); p.y += 0.41 / wf * cos(wf * 3.27 * p.x + time * 1.44); }
	p = abs(p) - 0.25;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.38; p = rot2(1.22) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.13, 0.42, 0.59), vec3(0.52, 0.81, 0.76), d);
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
