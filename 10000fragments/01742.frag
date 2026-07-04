uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.68 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.10 + t * 3.41 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	p = sin(p * 1.98 + time * 2.34) * 0.79;
	{ p = vec2(atan(p.y, p.x) * 2.12, length(p) * 2.75 - time * 0.79); }
	p *= 2.34;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.15;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.85 + time * 0.19);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
