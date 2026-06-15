uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.47 - t * 1.88 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.96;
	p = rot2(length(p) * -2.20 + time * 0.45) * p;
	p += vec2(0.27, 0.93) * sin(length(p) * 4.95 - time * 1.49) * 0.38;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 3.73 * p.y + time * 1.37); p.y += 0.48 / wf * cos(wf * 3.71 * p.x + time * 0.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.19, vec3(0.49, 0.46, 0.59), vec3(0.30, 0.33, 0.47), vec3(0.84, 1.29, 1.38), vec3(0.15, 0.52, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
