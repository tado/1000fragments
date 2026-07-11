uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.94 * sin(mf + 3.0) + ph), cos(t * 1.99 * cos(mf + 3.0) + ph));
        ms += 0.079 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.94, -0.38) * sin(length(p) * 3.77 - time * 1.84) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.14, vec3(0.47, 0.59, 0.50), vec3(0.43, 0.45, 0.38), vec3(1.06, 0.83, 0.93), vec3(0.67, 0.07, 0.48));
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.35 + time * 10.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
