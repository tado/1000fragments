uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.34 * sin(mf + 3.0) + ph), cos(t * 2.34 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.41) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.95 * p.y + time * 1.08); p.y += 0.36 / wf * cos(wf * 2.76 * p.x + time * 1.24); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.02, vec3(0.52, 0.54, 0.40), vec3(0.40, 0.41, 0.34), vec3(1.39, 1.27, 1.01), vec3(0.07, 0.74, 0.32));
	col = fract(col * 1.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
