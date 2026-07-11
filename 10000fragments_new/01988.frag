uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.42;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.70; kp = rot2(0.52) * kp; kp *= 1.35; }
    v = sin(kp.y * 3.87 - t * 1.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = (floor(p * 10.5) + 0.5) / 10.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.73));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
