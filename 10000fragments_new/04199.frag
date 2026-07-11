uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.71 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.15 + t * 1.72 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.48;
	p *= 1.65;
	p = (floor(p * 24.5) + 0.5) / 24.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.27; p = rot2(1.22) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.22, vec3(0.57, 0.51, 0.44), vec3(0.42, 0.43, 0.41), vec3(1.32, 1.30, 1.39), vec3(0.17, 0.63, 0.55));
	col *= 0.88 + 0.14 * sin(gl_FragCoord.y * 2.01 + time * 5.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
