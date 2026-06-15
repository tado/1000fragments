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
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.19 * sin(mf + 3.0) + ph), cos(t * 1.19 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	p = rot2(1.61) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 1.93 * p.y + time * 1.20); p.y += 0.24 / wf * cos(wf * 2.80 * p.x + time * 1.00); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.18, vec3(0.49, 0.47, 0.60), vec3(0.46, 0.33, 0.37), vec3(0.74, 1.25, 1.38), vec3(0.90, 0.64, 0.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
