uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.95 - t * 2.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.92 * sin(mf + 3.0) + ph), cos(t * 0.92 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = rot2(length(p) * 4.00 + time * 0.31) * p;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.69);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.52 + time * 0.22, vec3(0.42, 0.47, 0.47), vec3(0.49, 0.46, 0.35), vec3(0.92, 0.91, 1.10), vec3(0.31, 0.11, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
