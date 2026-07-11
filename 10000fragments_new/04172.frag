uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.86 * sin(mf + 3.0) + ph), cos(t * 0.62 * cos(mf + 3.0) + ph));
        ms += 0.067 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.88 + t * 2.05 + ph) + sin(p.y * 5.37 - t * 2.05 + ph)
        + sin((p.x + p.y) * 9.89 + t * 2.05 + ph) + sin(length(p) * 13.23 - t * 2.05 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.32);
	float d = d1 * d2;
	vec3 col = palette(d * 1.40 + time * 0.11, vec3(0.45, 0.43, 0.60), vec3(0.49, 0.38, 0.31), vec3(0.74, 0.71, 0.83), vec3(0.24, 0.94, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
