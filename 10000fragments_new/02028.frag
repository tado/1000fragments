uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.02 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.65 + t * 2.92 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	{ p = vec2(atan(p.y, p.x) * 2.18, length(p) * 2.47 - time * 0.96); }
	p.y += sin(p.x * 6.30 + time * 3.16) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.86, 0.57, 0.67) * (0.18 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
