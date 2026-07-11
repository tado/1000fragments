uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.26 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.05 + t * 1.66 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.79) * 1.01), cos((time * 0.79) * 1.33)) * 0.12;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.85 / 3.1415927, 0.91 / r + (time * 0.79) * 2.72);
	float d = field(tv, (time * 0.79), 0.0);
	vec3 col = vec3(0.60, 0.62, 0.45) * (0.10 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.49, 0.0, 1.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.85));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 1.008, 1.000) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
