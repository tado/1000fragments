uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.91 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.92 + t * 2.07 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 5.49 - time * 0.41); }
	p *= 2.95;
	p.y += sin(p.x * 2.77 + time * 3.52) * 0.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.27, vec3(0.59, 0.41, 0.40), vec3(0.32, 0.46, 0.39), vec3(1.23, 0.76, 1.18), vec3(0.62, 0.52, 0.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
