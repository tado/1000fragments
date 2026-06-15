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
        vec2 mm = vec2(sin(t * 2.30 * sin(mf + 3.0) + ph), cos(t * 2.30 * cos(mf + 3.0) + ph));
        ms += 0.095 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.98 + t * 1.15 + ph) + sin(p.y * 4.15 - t * 1.15 + ph)
        + sin((p.x + p.y) * 5.78 + t * 1.15 + ph) + sin(length(p) * 7.64 - t * 1.15 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = fract(p * 2.99) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.89 + time * 0.24, vec3(0.50, 0.47, 0.54), vec3(0.31, 0.39, 0.46), vec3(0.99, 1.23, 0.80), vec3(0.08, 0.77, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
