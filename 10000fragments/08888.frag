uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.27 * sin(mf + 3.0) + ph), cos(t * 2.27 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.09, 0.32), vec3(0.98, 0.84, 0.43), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
