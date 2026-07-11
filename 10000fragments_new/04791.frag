uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.29 + t * 3.05 + ph) + sin(p.y * 17.78 - t * 4.48 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.15 * p.y + time * 2.18); p.y += 0.30 / wf * cos(wf * 2.06 * p.x + time * 1.54); }
	p += vec2(0.00, -1.00) * sin(length(p) * 3.88 - time * 1.98) * 0.35;
	p = rot2(p.y * -3.45 + time * 0.84) * p;
	p = abs(p) - 0.78;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.93, 1.03, 1.19) + vec3(0.10, 0.09, 0.18);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
