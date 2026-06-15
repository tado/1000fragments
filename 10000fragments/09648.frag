uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.86 + sin(p.y * 5.31 + t * 4.65) * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	p = rot2(length(p) * 1.60 + time * 0.28) * p;
	p = fract(p * 2.84) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.25 * p.y + time * 0.88); p.y += 0.21 / wf * cos(wf * 3.36 * p.x + time * 1.40); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.14, 0.20), vec3(0.74, 0.59, 0.73), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
