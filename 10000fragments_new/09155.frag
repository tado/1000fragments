uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.36;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.42; kp = rot2(2.11) * kp; kp *= 1.38; }
    v = sin(kp.x * 2.70 - t * 5.00 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.70, length(p) * 5.03 - time * 0.62); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.31; p = rot2(2.38) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.79));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
