uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.48;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.60; kp = rot2(1.71) * kp; kp *= 1.41; }
    v = sin(kp.x * 1.60 - t * 4.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.23;
	p = sin(p * 1.41 + time * 1.23) * 0.99;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.50));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
