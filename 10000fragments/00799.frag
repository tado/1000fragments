uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.83 + sin(p.y * 2.95 + t * 2.76) * 4.82 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 2.51 * p.y + time * 1.09); p.y += 0.21 / wf * cos(wf * 3.57 * p.x + time * 0.80); }
	p = rot2(0.38) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.33, 0.07), vec3(0.99, 0.62, 1.00), d);
	col = fract(col * 2.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
