uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.16;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.60; kp = rot2(0.33) * kp; kp *= 1.31; }
    v = sin(kp.y * 2.36 - t * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	p = fract(p * 2.49) - 0.5;
	p = rot2(p.y * -1.70 + time * 0.91) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.52));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
