uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.05 * sin(mf + 3.0) + ph), cos(t * 2.05 * cos(mf + 3.0) + ph));
        ms += 0.044 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.74 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 3.48 * p.y + time * 0.98); p.y += 0.26 / wf * cos(wf * 2.92 * p.x + time * 1.85); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.14, vec3(0.59, 0.53, 0.54), vec3(0.46, 0.38, 0.45), vec3(0.84, 1.24, 0.82), vec3(0.43, 0.63, 0.64));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
