uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.90 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.78 + t * 2.18 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	p = abs(p);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.98;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.96 + time * 0.03, vec3(0.50, 0.52, 0.45), vec3(0.48, 0.46, 0.47), vec3(1.13, 1.11, 1.22), vec3(0.50, 0.72, 0.00));
	col = clamp((col - 0.5) * 1.27 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
