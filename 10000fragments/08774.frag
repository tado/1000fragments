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
        vec2 mm = vec2(sin(t * 2.10 * sin(mf + 3.0) + ph), cos(t * 2.10 * cos(mf + 3.0) + ph));
        ms += 0.044 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.03;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.08, vec3(0.58, 0.41, 0.40), vec3(0.48, 0.34, 0.40), vec3(1.15, 0.78, 1.18), vec3(0.72, 0.60, 0.11));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
