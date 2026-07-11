uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.64 * sin(mf + 3.0) + ph), cos(t * 0.64 * cos(mf + 3.0) + ph));
        ms += 0.023 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	p += vec2(-0.77, 0.92) * sin(length(p) * 3.80 - time * 1.44) * 0.25;
	p = fract(p * 1.65) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.48, 0.38, 0.50), vec3(0.53, 0.55, 0.52), d);
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
