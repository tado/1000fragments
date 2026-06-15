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
        vec2 mm = vec2(sin(t * 1.40 * sin(mf + 3.0) + ph), cos(t * 1.40 * cos(mf + 3.0) + ph));
        ms += 0.075 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	p = fract(p * 1.76) - 0.5;
	p += vec2(0.83, -0.76) * sin(length(p) * 5.31 - time * 1.61) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.95 + time * 0.18, vec3(0.47, 0.59, 0.55), vec3(0.49, 0.39, 0.34), vec3(1.10, 0.93, 1.32), vec3(0.35, 0.33, 0.36));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
