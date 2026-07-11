uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 1.81 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.56 + t * 3.79 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.58) * p;
	p = (floor(p * 15.2) + 0.5) / 15.2;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.10; p = rot2(1.83) * p; }
	p = fract(p * 1.73) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.53 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
