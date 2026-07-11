uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.52 + t * 2.14 + ph) + sin(p.y * 2.30 - t * 1.21 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.62 * sin(mf + 3.0) + ph), cos(t * 0.62 * cos(mf + 3.0) + ph));
        ms += 0.096 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.05);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.07 + time * 0.18, vec3(0.59, 0.42, 0.58), vec3(0.48, 0.41, 0.43), vec3(1.11, 0.96, 1.07), vec3(0.57, 0.65, 0.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
