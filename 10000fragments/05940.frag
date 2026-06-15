uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.34 * sin(mf + 3.0) + ph), cos(t * 2.34 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.70;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.46 * p.y + time * 0.72); p.y += 0.28 / wf * cos(wf * 2.09 * p.x + time * 0.63); }
	p += vec2(-0.75, -0.54) * sin(length(p) * 3.98 - time * 1.59) * 0.36;
	p = rot2(2.77) * p;
	{ float fr = length(p); p *= 1.0 + -0.49 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.14, vec3(0.56, 0.46, 0.43), vec3(0.32, 0.31, 0.41), vec3(1.21, 1.33, 1.27), vec3(0.62, 0.65, 0.28));
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
