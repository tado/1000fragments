uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.03 + t * 4.79 + ph) + sin(p.y * 10.07 - t * 5.84 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.75 * sin(mf + 3.0) + ph), cos(t * 1.75 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p += vec2(-0.90, 0.73) * sin(length(p) * 5.08 - time * 1.97) * 0.15;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.70 * p.y + time * 1.10); p.y += 0.26 / wf * cos(wf * 3.15 * p.x + time * 1.56); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.91 + time * 0.06, vec3(0.47, 0.54, 0.50), vec3(0.31, 0.34, 0.32), vec3(1.06, 0.88, 0.87), vec3(0.76, 0.50, 0.09));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
