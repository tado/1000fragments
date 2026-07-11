uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.73 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.65 + t * 3.45 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.76 + t * 2.85 + ph) + sin(p.y * 6.87 - t * 2.85 + ph)
        + sin((p.x + p.y) * 11.08 + t * 2.85 + ph) + sin(length(p) * 17.53 - t * 2.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	p.y += sin(p.x * 2.09 + time * 2.63) * 0.23;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.43);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.18 + time * 0.05, vec3(0.47, 0.41, 0.41), vec3(0.35, 0.38, 0.47), vec3(0.84, 1.02, 1.39), vec3(0.25, 0.10, 0.69));
	col = fract(col * 2.00);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
