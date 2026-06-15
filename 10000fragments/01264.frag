uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.22 + sin(p.y * 4.65 + t * 5.56) * 3.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.80 * sin(mf + 3.0) + ph), cos(t * 0.80 * cos(mf + 3.0) + ph));
        ms += 0.037 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.17 + time * 0.04, vec3(0.60, 0.43, 0.55), vec3(0.49, 0.48, 0.40), vec3(0.96, 0.78, 1.23), vec3(0.55, 0.66, 0.36));
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
