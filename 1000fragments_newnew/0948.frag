uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.29 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.82 + t * 2.21 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + (time * 0.66) * -0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.79 / 3.1415927, 1.25 / r - (time * 0.66) * 2.42);
	float d = field(tv, (time * 0.66), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.65, 0.65, 0.75), vec3(0.15, 0.08, 0.08), cc);
	col *= clamp(r * 1.73, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.983, 1.012) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
