uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.65 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.46 + t * 3.64 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	{ float fr = length(p); p *= 1.0 + -0.66 * fr * fr; }
	p = rot2(2.27) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.27, vec3(0.57, 0.60, 0.41), vec3(0.36, 0.44, 0.37), vec3(1.00, 0.90, 0.70), vec3(0.34, 0.95, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
