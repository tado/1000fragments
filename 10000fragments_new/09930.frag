uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.49 * sin(mf + 3.0) + ph), cos(t * 2.40 * cos(mf + 3.0) + ph));
        ms += 0.053 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.60;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.33, 0.48), vec3(0.85, 0.80, 0.85), d);
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 2.44 + time * 14.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
