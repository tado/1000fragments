uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.07 * sin(mf + 3.0) + ph), cos(t * 0.97 * cos(mf + 3.0) + ph));
        ms += 0.089 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.62) * 0.75), cos((time * 0.62) * 0.94)) * 0.12;
	float an = atan(p.y, p.x) + (time * 0.62) * -0.31;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.25 / 3.1415927, 0.98 / r + (time * 0.62) * 0.61);
	tv.x += tv.y * 0.43;
	float d = field(tv, (time * 0.62), 0.0);
	vec3 col = vec3(0.78, 0.68, 0.70) * (0.10 / (abs((d)) + 0.08));
	col = col / (1.0 + col);
	col *= clamp(r * 2.42, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.004, 0.955, 0.992) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
