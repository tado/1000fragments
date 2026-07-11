uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.05 * sin(mf + 3.0) + ph), cos(t * 1.93 * cos(mf + 3.0) + ph));
        ms += 0.079 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p = abs(p);
	p = fract(p * 1.48) - 0.5;
	p = (floor(p * 15.1) + 0.5) / 15.1;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.38, 0.37), vec3(0.60, 0.60, 0.72), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
