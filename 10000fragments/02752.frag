uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.18 + vec2(t * 1.08, -t * 1.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.59 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.16 + t * 2.71 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.23, length(p) * 3.41 - time * 0.41); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.54 + time * 0.10, vec3(0.43, 0.48, 0.53), vec3(0.43, 0.43, 0.33), vec3(0.85, 0.96, 0.93), vec3(0.96, 0.14, 0.79));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
