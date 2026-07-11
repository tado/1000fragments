uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.77 + sin(p.y * 5.43 + t * 1.13) * 2.49 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.29 * sin(mf + 3.0) + ph), cos(t * 1.69 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.02);
	float d = d1 + d2;
	vec3 col = palette(d * 1.39 + time * 0.28, vec3(0.45, 0.41, 0.55), vec3(0.37, 0.48, 0.46), vec3(1.18, 0.91, 1.00), vec3(0.66, 0.36, 0.30));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
