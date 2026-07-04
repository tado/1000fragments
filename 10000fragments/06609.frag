uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.04 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.84 + t * 2.98 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.82));
	p = sin(p * 2.56 + time * 2.07) * 1.27;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.53; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.02, vec3(0.51, 0.53, 0.52), vec3(0.32, 0.31, 0.42), vec3(1.17, 1.02, 1.11), vec3(0.34, 0.28, 0.45));
	col = mod(col * 1.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
