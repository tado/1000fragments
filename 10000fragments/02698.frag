uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.95 - t * 2.56 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.11 * sin(mf + 3.0) + ph), cos(t * 1.11 * cos(mf + 3.0) + ph));
        ms += 0.035 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.45 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.11);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.74 + time * 0.05, vec3(0.46, 0.60, 0.42), vec3(0.33, 0.48, 0.32), vec3(1.39, 1.25, 0.71), vec3(0.14, 0.25, 0.27));
	col = clamp((col - 0.5) * 1.98 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
