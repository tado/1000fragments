uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.59 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.01 + t * 2.24 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.24, lr * 1.66 + time * 0.82); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.02, vec3(0.56, 0.54, 0.44), vec3(0.32, 0.48, 0.34), vec3(0.87, 1.06, 1.39), vec3(0.47, 0.13, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
