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
        vec2 mm = vec2(sin(t * 1.72 * sin(mf + 3.0) + ph), cos(t * 1.72 * cos(mf + 3.0) + ph));
        ms += 0.029 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.49 + sin(p.y * 3.72 + t * 2.83) * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.37 + time * 0.21, vec3(0.57, 0.43, 0.44), vec3(0.38, 0.38, 0.33), vec3(1.30, 1.23, 0.96), vec3(0.24, 0.07, 0.09));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
