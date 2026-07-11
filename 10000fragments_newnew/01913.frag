uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.83 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.83 + t * 3.79 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	p = rot2(time * 1.58) * p;
	p = rot2(p.y * -2.14 + time * 0.90) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.45, 0.73, 0.46) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.30 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
