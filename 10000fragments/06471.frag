uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.96 * sin(mf + 3.0) + ph), cos(t * 1.96 * cos(mf + 3.0) + ph));
        ms += 0.027 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.17 + t * 0.87 + ph) + sin(p.y * 12.90 - t * 0.87 + ph)
        + sin((p.x + p.y) * 9.85 + t * 0.87 + ph) + sin(length(p) * 13.47 - t * 0.87 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.28);
	float d = d1 + d2;
	vec3 col = palette(d * 0.67 + time * 0.08, vec3(0.46, 0.40, 0.48), vec3(0.42, 0.31, 0.33), vec3(1.28, 1.04, 1.04), vec3(0.63, 0.78, 0.86));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
