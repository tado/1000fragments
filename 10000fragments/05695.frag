uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.05 - t * 4.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.58 * p.y + time * 1.38); p.y += 0.21 / wf * cos(wf * 3.65 * p.x + time * 1.42); }
	p *= 2.45;
	p = rot2(p.y * -2.96 + time * 0.42) * p;
	p += vec2(-0.91, 0.38) * sin(length(p) * 2.45 - time * 0.76) * 0.34;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.96 + time * 0.08, vec3(0.55, 0.46, 0.60), vec3(0.39, 0.48, 0.30), vec3(0.78, 1.02, 1.27), vec3(0.06, 0.83, 0.56));
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
