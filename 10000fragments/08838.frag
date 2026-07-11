uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.94 * sin(mf + 3.0) + ph), cos(t * 1.94 * cos(mf + 3.0) + ph));
        ms += 0.031 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	p += vec2(-0.11, -0.36) * sin(length(p) * 2.02 - time * 1.93) * 0.25;
	p = fract(p * 2.12) - 0.5;
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.36, 0.46), vec3(0.60, 0.59, 0.80), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
