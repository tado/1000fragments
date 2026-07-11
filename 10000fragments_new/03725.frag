uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.75;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.70; kp = rot2(2.37) * kp; kp *= 1.36; }
    v = sin(kp.x * 1.57 - t * 3.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.72;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.49; p = rot2(1.34) * p; }
	p.x += sin(p.y * 7.56 + time * 3.85) * 0.13;
	p = rot2(time * -0.68) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.71, 0.53, 0.75) * (0.15 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
