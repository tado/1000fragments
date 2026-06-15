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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.32 * sin(mf + 3.0) + ph), cos(t * 1.32 * cos(mf + 3.0) + ph));
        ms += 0.097 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.97) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = abs(p) - 0.47;
	p = rot2(length(p) * -2.06 + time * 0.74) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.81 * p.y + time * 1.30); p.y += 0.29 / wf * cos(wf * 3.89 * p.x + time * 1.84); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.65 + time * 0.26, vec3(0.54, 0.42, 0.55), vec3(0.44, 0.39, 0.44), vec3(1.31, 0.88, 1.09), vec3(0.07, 0.58, 0.76));
	col = mod(col * 2.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
