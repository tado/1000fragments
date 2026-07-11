uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 27.74 - t * 2.61 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 30.88 - t * 2.16 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.87 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.20 + t * 2.91 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.45; p = rot2(1.60) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.81, length(p) * 4.43 - time * 0.79); }
	p = abs(p);
	p = rot2(length(p) * 2.09 + time * 1.40) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.84);
	float d = d1 * d2;
	vec3 col = palette(d * 1.66 + time * 0.23, vec3(0.45, 0.44, 0.43), vec3(0.43, 0.49, 0.44), vec3(1.40, 0.86, 0.78), vec3(0.66, 0.55, 0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
