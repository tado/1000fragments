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
        vec2 mm = vec2(sin(t * 0.83 * sin(mf + 3.0) + ph), cos(t * 0.83 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.15 + t * 3.99 + ph) + sin(p.y * 8.33 - t * 3.99 + ph)
        + sin((p.x + p.y) * 4.57 + t * 3.99 + ph) + sin(length(p) * 8.79 - t * 3.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.08);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.30 + time * 0.08, vec3(0.59, 0.49, 0.43), vec3(0.35, 0.36, 0.44), vec3(0.91, 0.71, 1.29), vec3(0.66, 0.69, 0.11));
	col = fract(col * 2.39);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
