uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.48 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.45 + t * 2.98 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	{ p = vec2(atan(p.y, p.x) * 2.95, length(p) * 2.38 - time * 0.63); }
	p = abs(p) - 0.80;
	p = rot2(length(p) * 2.28 + time * 0.88) * p;
	p = rot2(time * -0.65) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.40));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
