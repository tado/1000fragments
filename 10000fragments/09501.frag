uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.70 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.96 + t * 2.99 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.47;
	p *= 2.16;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.82; }
	p = rot2(length(p) * -1.04 + time * 0.94) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.98 + time * 0.29);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
