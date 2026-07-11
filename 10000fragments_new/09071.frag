uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.00;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.79; kp = rot2(2.34) * kp; kp *= 1.24; }
    v = sin(kp.x * 3.28 - t * 2.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	p = rot2(time * -1.18) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.42));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
