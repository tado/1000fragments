uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.02;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.60; kp = rot2(0.57) * kp; kp *= 1.23; }
    v = sin(kp.x * 3.48 - t * 2.14 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = rot2(time * 1.05) * p;
	p = rot2(length(p) * -1.95 + time * 1.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.62, 0.18, 0.29) * (0.08 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
