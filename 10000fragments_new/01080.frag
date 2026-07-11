uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.42 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.70 + t * 2.54 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	p = rot2(p.y * -2.70 + time * 0.40) * p;
	p.y += sin(p.x * 5.24 + time * 2.85) * 0.38;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.43; p = rot2(1.99) * p; }
	p = (floor(p * 25.0) + 0.5) / 25.0;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.78));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
