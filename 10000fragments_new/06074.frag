uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.37 + 0.17 * pow(abs(cos(ra * 2.0 + t * 1.66)), 1.40);
    v = sin((rr - pet) * 18.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.11 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 2.00 + t * 2.72 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(time * -0.96) * p;
	p = (floor(p * 28.6) + 0.5) / 28.6;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.75);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.73 + time * 0.07, vec3(0.44, 0.52, 0.45), vec3(0.41, 0.43, 0.36), vec3(0.99, 0.77, 0.84), vec3(0.60, 0.05, 0.08));
	col *= 0.90 + 0.12 * sin(gl_FragCoord.y * 1.02 + time * 14.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
