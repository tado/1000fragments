uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.47 * sin(mf + 3.0) + ph), cos(t * 0.78 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.61) * 0.66), cos((time * 0.61) * 0.79)) * 0.09;
	float an = atan(p.y, p.x) + (time * 0.61) * -0.24;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.63 / 3.1415927, 0.98 / r + (time * 0.61) * 2.18);
	tv.x += tv.y * 0.15;
	float d = field(tv, (time * 0.61), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.69, 0.67, 0.74) + vec3(0.12, 0.05, 0.04);
	col *= clamp(r * 2.25, 0.0, 1.0);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.49);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 1.008, 1.001) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
