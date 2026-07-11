uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.44;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.53; kp = rot2(2.18) * kp; kp *= 1.29; }
    v = sin(kp.x * 1.82 - t * 3.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p += vec2(0.74, 0.34) * sin(length(p) * 5.68 - time * 1.77) * 0.37;
	p *= 2.11;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.27, 0.22, 0.74) * (0.07 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
