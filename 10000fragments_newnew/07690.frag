uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.68 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.84 + t * 2.39 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.88;
	p = rot2(length(p) * -2.59 + time * 1.40) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.91, 0.19, 0.85) * (0.22 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = mod(col * 2.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
