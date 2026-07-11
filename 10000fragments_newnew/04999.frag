uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.04 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.92 + t * 2.06 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.85; }
	p += vec2(0.59, 0.70) * sin(length(p) * 5.56 - time * 1.28) * 0.24;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.82;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.91));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
