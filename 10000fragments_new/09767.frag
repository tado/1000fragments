uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.41 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.20 + t * 1.59 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	p = rot2(1.05) * p;
	p = abs(p);
	p = (floor(p * 22.3) + 0.5) / 22.3;
	p = rot2(p.y * 3.67 + time * 0.60) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.44, 0.06), vec3(0.78, 0.75, 0.61), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
