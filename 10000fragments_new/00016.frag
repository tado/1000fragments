uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.06 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.33 + t * 3.30 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 11.7) + 0.5) / 11.7;
	p *= 2.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.87 + time * 0.00, vec3(0.47, 0.58, 0.46), vec3(0.34, 0.42, 0.40), vec3(0.74, 1.05, 1.29), vec3(0.49, 0.96, 0.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
