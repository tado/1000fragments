uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.42 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.18 + t * 1.04 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.21, vec3(0.48, 0.44, 0.45), vec3(0.41, 0.47, 0.32), vec3(1.33, 0.90, 0.84), vec3(0.87, 0.22, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
