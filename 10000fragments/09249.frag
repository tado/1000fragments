uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 5.92;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.25 + 0.10 * sin(t * 4.84 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 2.82 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.84 + t * 2.63 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.25;
	p = rot2(length(p) * 3.80 + time * 0.99) * p;
	{ p = vec2(atan(p.y, p.x) * 2.81, length(p) * 2.31 - time * 0.55); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.16);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.20 + time * 0.20, vec3(0.53, 0.59, 0.58), vec3(0.33, 0.49, 0.36), vec3(1.34, 1.30, 1.12), vec3(0.74, 0.27, 0.97));
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
