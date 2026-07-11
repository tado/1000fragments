uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.25;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.51; kp = rot2(1.99) * kp; kp *= 1.16; }
    v = sin(kp.y * 3.89 - t * 3.67 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.31;
	p = (floor(p * 26.3) + 0.5) / 26.3;
	p *= 2.40;
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	p = rot2(2.88) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.52 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
