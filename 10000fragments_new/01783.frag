uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.53 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.81 + t * 3.06 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	p = rot2(length(p) * -2.96 + time * 1.16) * p;
	{ p = vec2(atan(p.y, p.x) * 1.21, length(p) * 4.77 - time * 0.99); }
	p = abs(p) - 0.64;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.38, 0.22, 0.74) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.10 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
