uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.27 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.70 + t * 1.26 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.24, vec3(0.41, 0.42, 0.42), vec3(0.46, 0.42, 0.31), vec3(1.10, 1.08, 0.78), vec3(0.54, 0.81, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
