uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.28;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.65; kp = rot2(2.32) * kp; kp *= 1.28; }
    v = sin(kp.x * 3.31 - t * 3.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.81;
	p.y += sin(p.x * 4.97 + time * 1.20) * 0.23;
	p = rot2(length(p) * -2.85 + time * 0.74) * p;
	p = abs(p) - 0.66;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
