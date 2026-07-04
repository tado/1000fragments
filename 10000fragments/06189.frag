uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.77 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.22 + t * 3.09 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.11, length(p) * 2.87 - time * 0.79); }
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.50, 0.19, 0.14), vec3(0.97, 0.92, 0.63), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
