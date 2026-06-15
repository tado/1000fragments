uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.55 * sin(mf + 3.0) + ph), cos(t * 1.55 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.77) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 1.42 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.19;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = d1 + d2;
	vec3 col = palette(d * 1.43 + time * 0.10, vec3(0.40, 0.43, 0.53), vec3(0.39, 0.43, 0.43), vec3(0.71, 1.27, 0.84), vec3(0.76, 0.73, 0.88));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
