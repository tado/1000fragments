uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.99 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.80 + t * 3.20 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.61) * 0.42), cos((time * 0.61) * 0.84)) * 0.13;
	p += vec2(sin((time * 0.61) * 1.02), cos((time * 0.61) * 0.95)) * 0.07;
	float an = atan(p.y, p.x) + (time * 0.61) * 0.74;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.55 / 3.1415927, 0.74 / r + (time * 0.61) * 0.96);
	float d = field(tv, (time * 0.61), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.09, 0.16), vec3(0.63, 0.57, 0.60), cc);
	col *= clamp(r * 2.45, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(0.996, 0.981, 0.989) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
