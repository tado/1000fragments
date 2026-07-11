uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.61 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.86 + t * 1.53 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p *= 2.43;
	p = (floor(p * 23.5) + 0.5) / 23.5;
	p = fract(p * 2.79) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.39; p = rot2(0.89) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.33, 0.35, 0.56), vec3(0.85, 0.66, 0.51), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
