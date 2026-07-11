uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.42) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 3.71 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.52 * sin(mf + 3.0) + ph), cos(t * 1.55 * cos(mf + 3.0) + ph));
        ms += 0.072 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.38);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.56 + time * 0.14, vec3(0.46, 0.53, 0.48), vec3(0.42, 0.46, 0.47), vec3(1.28, 1.13, 1.05), vec3(0.34, 0.79, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
