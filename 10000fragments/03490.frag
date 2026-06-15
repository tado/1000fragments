uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.76 + t * 0.73 + ph) + sin(p.y * 11.33 - t * 0.73 + ph)
        + sin((p.x + p.y) * 6.99 + t * 0.73 + ph) + sin(length(p) * 16.80 - t * 0.73 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.82 * sin(mf + 3.0) + ph), cos(t * 1.82 * cos(mf + 3.0) + ph));
        ms += 0.085 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	p += vec2(-0.35, 0.56) * sin(length(p) * 2.01 - time * 1.51) * 0.34;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.15);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.51 + time * 0.20, vec3(0.42, 0.51, 0.43), vec3(0.32, 0.33, 0.40), vec3(1.38, 1.32, 0.78), vec3(0.94, 0.57, 0.14));
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
