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
        vec2 mm = vec2(sin(t * 1.60 * sin(mf + 3.0) + ph), cos(t * 1.60 * cos(mf + 3.0) + ph));
        ms += 0.057 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.45;
	p += vec2(-0.50, -0.18) * sin(length(p) * 5.09 - time * 1.08) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.14, vec3(0.51, 0.55, 0.42), vec3(0.47, 0.31, 0.42), vec3(1.34, 1.15, 0.97), vec3(0.55, 0.02, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
