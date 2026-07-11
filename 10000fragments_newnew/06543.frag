uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.14 + t * 0.98 + ph) + sin(p.y * 12.17 - t * 0.98 + ph)
        + sin((p.x + p.y) * 11.53 + t * 0.98 + ph) + sin(length(p) * 8.02 - t * 0.98 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.57 * sin(mf + 3.0) + ph), cos(t * 1.60 * cos(mf + 3.0) + ph));
        ms += 0.085 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.04, vec3(0.54, 0.46, 0.47), vec3(0.31, 0.40, 0.39), vec3(1.37, 0.94, 1.26), vec3(0.30, 0.73, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
