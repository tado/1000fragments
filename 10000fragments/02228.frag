uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.95 * sin(mf + 3.0) + ph), cos(t * 1.95 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.68 + time * 0.05, vec3(0.48, 0.43, 0.59), vec3(0.47, 0.31, 0.41), vec3(0.77, 1.18, 0.75), vec3(0.13, 0.98, 0.62));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
