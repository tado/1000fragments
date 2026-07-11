uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.59;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.46; kp = rot2(0.91) * kp; kp *= 1.22; }
    v = sin(kp.x * 3.05 - t * 4.30 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(0.69) * p; }
	p += vec2(0.45, -0.27) * sin(length(p) * 3.28 - time * 1.55) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.58, 0.60, 0.80) * (0.08 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
