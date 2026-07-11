uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.20 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.70 + t * 1.96 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.77 - t * 7.48 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = fract(p * 2.84) - 0.5;
	p.x += sin(p.y * 5.51 + time * 1.97) * 0.28;
	{ p = vec2(atan(p.y, p.x) * 2.81, length(p) * 3.00 - time * 0.39); }
	p = rot2(1.65) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.41);
	float d = d1 + d2;
	vec3 col = palette(d * 0.78 + time * 0.09, vec3(0.50, 0.54, 0.50), vec3(0.49, 0.34, 0.35), vec3(1.38, 1.00, 1.33), vec3(0.20, 0.09, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
