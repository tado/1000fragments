uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.28 * sin(mf + 3.0) + ph), cos(t * 2.28 * cos(mf + 3.0) + ph));
        ms += 0.099 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.18;
	p = abs(p) - 0.23;
	p += vec2(-0.54, 0.32) * sin(length(p) * 4.36 - time * 0.64) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.67, 1.13, 1.44) + vec3(0.16, 0.01, 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
