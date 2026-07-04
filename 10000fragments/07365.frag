uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.75 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.43 + t * 1.04 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.37;
	p = (floor(p * 10.5) + 0.5) / 10.5;
	p = rot2(time * -1.37) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.68; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.83 + time * 0.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
