uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.34;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.44; kp = rot2(1.09) * kp; kp *= 1.34; }
    v = sin(kp.x * 1.75 - t * 4.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	{ float fr = length(p); p *= 1.0 + 0.49 * fr * fr; }
	p = fract(p * 2.33) - 0.5;
	p += vec2(-0.88, 0.23) * sin(length(p) * 5.51 - time * 2.11) * 0.39;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.28, 0.20, 0.55) * (0.08 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
