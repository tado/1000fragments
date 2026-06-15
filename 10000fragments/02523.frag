uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.79 * sin(mf + 3.0) + ph), cos(t * 0.79 * cos(mf + 3.0) + ph));
        ms += 0.027 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.14, length(p) * 4.89 - time * 0.22); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.12 * p.y + time * 0.64); p.y += 0.49 / wf * cos(wf * 1.85 * p.x + time * 0.74); }
	p += vec2(0.13, -0.41) * sin(length(p) * 3.87 - time * 1.31) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.21, vec3(0.48, 0.40, 0.54), vec3(0.39, 0.47, 0.41), vec3(1.09, 0.91, 1.26), vec3(0.90, 0.10, 0.61));
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
