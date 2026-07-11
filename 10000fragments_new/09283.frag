uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.41 * sin(mf + 3.0) + ph), cos(t * 0.38 * cos(mf + 3.0) + ph));
        ms += 0.063 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	p *= 3.07;
	p = abs(p) - 0.60;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.15, 0.23), vec3(0.75, 0.82, 0.93), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
