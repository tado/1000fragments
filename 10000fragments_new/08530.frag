uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.03;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.45; kp = rot2(1.56) * kp; kp *= 1.24; }
    v = sin(kp.y * 2.23 - t * 4.39 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.32;
	p += vec2(-0.25, 0.74) * sin(length(p) * 4.62 - time * 1.27) * 0.26;
	p = rot2(time * 0.48) * p;
	{ p = vec2(atan(p.y, p.x) * 1.26, length(p) * 3.67 - time * 0.27); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
