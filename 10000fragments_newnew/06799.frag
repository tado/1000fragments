uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.87 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.70 + t * 1.05 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.25; p = rot2(0.95) * p; }
	p = sin(p * 1.14 + time * 0.51) * 1.19;
	p = rot2(length(p) * 3.27 + time * 0.71) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.26, vec3(0.45, 0.51, 0.59), vec3(0.43, 0.48, 0.49), vec3(0.75, 0.92, 0.78), vec3(0.23, 0.72, 0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
