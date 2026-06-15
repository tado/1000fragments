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
        vec2 mm = vec2(sin(t * 0.65 * sin(mf + 3.0) + ph), cos(t * 0.65 * cos(mf + 3.0) + ph));
        ms += 0.061 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.05 - t * 8.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 2.84 * p.y + time * 1.29); p.y += 0.28 / wf * cos(wf * 1.98 * p.x + time * 1.24); }
	p = abs(p);
	p += vec2(-0.62, 0.99) * sin(length(p) * 5.87 - time * 1.37) * 0.17;
	p = fract(p * 2.45) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.82);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.77 + time * 0.26, vec3(0.48, 0.41, 0.44), vec3(0.40, 0.44, 0.36), vec3(0.97, 1.34, 1.13), vec3(0.01, 0.30, 0.63));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
