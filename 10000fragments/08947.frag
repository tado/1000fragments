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
        vec2 mm = vec2(sin(t * 1.85 * sin(mf + 3.0) + ph), cos(t * 1.85 * cos(mf + 3.0) + ph));
        ms += 0.073 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.59 + sin(p.y * 2.50 + t * 3.55) * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	p = fract(p * 2.89) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.38);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.53 + time * 0.10, vec3(0.46, 0.42, 0.59), vec3(0.31, 0.48, 0.31), vec3(1.17, 1.09, 0.78), vec3(0.33, 0.90, 0.41));
	col = clamp((col - 0.5) * 1.49 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
