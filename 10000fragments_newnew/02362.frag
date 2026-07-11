uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.31 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.37 + t * 3.39 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.83; }
	p.y += sin(p.x * 2.04 + time * 2.23) * 0.23;
	p = rot2(length(p) * 1.06 + time * 0.99) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.29, vec3(0.42, 0.57, 0.50), vec3(0.30, 0.43, 0.41), vec3(1.10, 0.78, 1.15), vec3(0.63, 0.37, 0.60));
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
