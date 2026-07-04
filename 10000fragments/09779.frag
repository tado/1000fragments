uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.33;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.76; kp = rot2(1.89) * kp; kp *= 1.30; }
    v = sin(kp.y * 3.92 - t * 2.77 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.77));
	p = (floor(p * 28.2) + 0.5) / 28.2;
	p = rot2(length(p) * -3.03 + time * 0.87) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.69), field(p, time, 1.37));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.97 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
