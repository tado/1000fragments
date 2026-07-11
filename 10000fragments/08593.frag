uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.67, t * 1.02 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.46 * sin(mf + 3.0) + ph), cos(t * 1.46 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.12, vec3(0.57, 0.57, 0.56), vec3(0.49, 0.33, 0.46), vec3(1.33, 1.12, 1.39), vec3(0.43, 0.39, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
