uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.00;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.71; kp = rot2(0.81) * kp; kp *= 1.39; }
    v = sin(kp.x * 3.42 - t * 1.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	p = rot2(length(p) * -3.03 + time * 1.45) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.66, 0.73, 0.31) * (0.24 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 2.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
