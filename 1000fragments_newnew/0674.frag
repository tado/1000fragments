uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.86 * sin(mf + 3.0) + ph), cos(t * 1.91 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.66) * 0.70), cos((time * 0.66) * 0.89)) * 0.22;
	float an = atan(p.y, p.x) + (time * 0.66) * 0.17;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.30 / 3.1415927, 0.64 / r - (time * 0.66) * 2.90);
	float d = field(tv, (time * 0.66), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.51, 0.43, 0.43) + vec3(0.07, 0.04, 0.00);
	col *= clamp(r * 2.54, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.18));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 1.008, 0.954) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
