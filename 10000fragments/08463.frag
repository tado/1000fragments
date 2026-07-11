uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.42 * sin(mf + 3.0) + ph), cos(t * 0.42 * cos(mf + 3.0) + ph));
        ms += 0.025 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.68;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.23, vec3(0.40, 0.54, 0.41), vec3(0.46, 0.43, 0.39), vec3(1.26, 1.30, 1.17), vec3(0.37, 0.67, 0.21));
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
