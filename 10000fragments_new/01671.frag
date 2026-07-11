uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 4.54 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.30 + t * 3.52 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	p = rot2(p.y * -1.53 + time * 0.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.72 + time * 0.28, vec3(0.58, 0.45, 0.56), vec3(0.43, 0.36, 0.40), vec3(1.30, 1.31, 1.04), vec3(0.32, 0.24, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
