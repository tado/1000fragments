uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.79 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.62 + t * 2.62 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.08 + t * 3.17 + ph) + sin(p.y * 13.84 - t * 3.17 + ph)
        + sin((p.x + p.y) * 3.21 + t * 3.17 + ph) + sin(length(p) * 13.32 - t * 3.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.59;
	{ p = vec2(atan(p.y, p.x) * 2.48, length(p) * 2.70 - time * 0.32); }
	p *= 1.76;
	p = rot2(length(p) * -2.73 + time * 0.33) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.46 + time * 0.23, vec3(0.54, 0.58, 0.52), vec3(0.38, 0.39, 0.39), vec3(1.31, 0.74, 0.84), vec3(0.09, 0.01, 0.94));
	col = fract(col * 1.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
