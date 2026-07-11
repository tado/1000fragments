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
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.34 * sin(mf + 3.0) + ph), cos(t * 1.34 * cos(mf + 3.0) + ph));
        ms += 0.089 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	p = rot2(1.00) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.13 * p.y + time * 1.92); p.y += 0.28 / wf * cos(wf * 2.19 * p.x + time * 1.68); }
	p += vec2(-0.42, -0.85) * sin(length(p) * 5.63 - time * 1.86) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.15, vec3(0.48, 0.58, 0.43), vec3(0.38, 0.45, 0.49), vec3(0.80, 0.83, 1.24), vec3(0.05, 0.30, 0.30));
	col = fract(col * 1.86);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
