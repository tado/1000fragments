uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.70 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.22 + t * 2.37 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.79;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.70; }
	p += vec2(-0.41, -0.22) * sin(length(p) * 3.00 - (time * 0.58) * 1.34) * 0.16;
	p = rot2(p.y * 1.36 + (time * 0.58) * 0.50) * p;
	p = sin(p * 1.90 + (time * 0.58) * 1.00) * 1.14;
	float d = field(p, (time * 0.58), 0.0);
	vec3 col = palette(d * 0.80 + (time * 0.58) * 0.01, vec3(0.53, 0.43, 0.49), vec3(0.19, 0.11, 0.18), vec3(0.82, 0.84, 0.72), vec3(0.41, 0.70, 0.47));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.968, 1.004) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
