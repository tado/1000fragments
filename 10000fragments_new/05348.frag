uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.08;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.68; kp = rot2(2.10) * kp; kp *= 1.36; }
    v = sin(kp.y * 1.38 - t * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	p *= 1.87;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.57, 0.73, 0.23) * (0.23 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
