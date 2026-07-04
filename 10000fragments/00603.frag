uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.42 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.36 + t * 1.39 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.91 + time * 1.09) * p;
	p *= 3.02;
	p = sin(p * 1.19 + time * 0.79) * 0.71;
	p = rot2(0.61) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.25, vec3(0.44, 0.55, 0.55), vec3(0.40, 0.31, 0.36), vec3(1.12, 1.17, 1.37), vec3(0.31, 0.35, 1.00));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
