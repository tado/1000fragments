uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.68 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.34 + t * 1.31 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.45) - 0.5;
    float rad = 0.41 + 0.12 * sin(t * 1.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.37; p = rot2(1.99) * p; }
	p *= 3.08;
	p = rot2(length(p) * -2.42 + time * 0.97) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = d1 * d2;
	vec3 col = palette(d * 0.61 + time * 0.01, vec3(0.54, 0.50, 0.49), vec3(0.44, 0.31, 0.32), vec3(1.20, 0.90, 1.03), vec3(0.43, 0.13, 0.94));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
