uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.35 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.89 + t * 1.95 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.65) * 0.81), cos((time * 0.65) * 0.95)) * 0.24;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.59 / 3.1415927, 0.57 / r - (time * 0.65) * 2.36);
	tv.x += tv.y * 0.13;
	float d = field(tv, (time * 0.65), 0.0);
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.59, 0.51, 0.43) + vec3(0.05, 0.01, 0.00);
	col *= clamp(r * 1.62, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.008, 0.959, 0.996) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
