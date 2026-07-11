uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.00 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.01 + t * 2.51 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(0.76) * p;
	p = rot2(length(p) * 2.56 + time * 0.98) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.25, vec3(0.41, 0.57, 0.45), vec3(0.42, 0.33, 0.49), vec3(0.87, 1.16, 1.24), vec3(0.24, 0.02, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
