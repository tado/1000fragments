uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.97 + vec2(t * 0.55, -t * 0.55) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2(p.y * 2.42 + time * 0.83) * p;
	p = fract(p * 2.85) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.21 * p.y + time * 1.15); p.y += 0.24 / wf * cos(wf * 3.17 * p.x + time * 1.02); }
	p = rot2(time * -0.51) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.63, 1.10, 1.46) + vec3(0.20, 0.23, 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
