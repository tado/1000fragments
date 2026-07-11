uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.22 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.93 + t * 2.55 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.90;
	p += vec2(-0.33, 0.80) * sin(length(p) * 4.11 - time * 1.22) * 0.15;
	p *= 1.38;
	{ float fr = length(p); p *= 1.0 + 0.78 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.82 + time * 0.18, vec3(0.41, 0.46, 0.56), vec3(0.41, 0.37, 0.47), vec3(1.07, 0.75, 0.75), vec3(0.89, 0.90, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
