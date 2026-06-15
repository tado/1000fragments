uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.63 * sin(mf + 3.0) + ph), cos(t * 0.63 * cos(mf + 3.0) + ph));
        ms += 0.086 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	p *= 3.19;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.67 * p.y + time * 1.62); p.y += 0.26 / wf * cos(wf * 3.06 * p.x + time * 1.91); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.99 + time * 0.26, vec3(0.41, 0.56, 0.60), vec3(0.45, 0.31, 0.33), vec3(0.87, 0.92, 1.20), vec3(0.75, 0.83, 0.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
