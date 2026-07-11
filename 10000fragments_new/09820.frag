uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.12;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.65; kp = rot2(0.97) * kp; kp *= 1.26; }
    v = sin(kp.x * 1.61 - t * 2.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = fract(p * 2.94) - 0.5;
	p *= 1.97;
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	p = (floor(p * 21.9) + 0.5) / 21.9;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.03), field(p, time, 2.07));
	col = 0.5 + 0.5 * col;
	col *= 0.88 + 0.19 * sin(gl_FragCoord.y * 2.38 + time * 5.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
