uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.51 * sin(mf + 3.0) + ph), cos(t * 0.51 * cos(mf + 3.0) + ph));
        ms += 0.068 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.26;
	p += vec2(0.52, -0.88) * sin(length(p) * 4.56 - time * 0.68) * 0.15;
	p = fract(p * 2.04) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.23, 0.01, 0.18), vec3(0.67, 0.94, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
