uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.19 + sin(p.y * 1.62 + t * 1.62) * 2.08 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.83 * sin(mf + 3.0) + ph), cos(t * 0.83 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.38);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.03 + time * 0.23, vec3(0.41, 0.51, 0.44), vec3(0.38, 0.45, 0.43), vec3(1.40, 1.14, 1.32), vec3(0.87, 0.25, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
