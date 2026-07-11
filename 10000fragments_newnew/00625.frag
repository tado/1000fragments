uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.51;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.45; kp = rot2(0.38) * kp; kp *= 1.44; }
    v = sin(kp.y * 1.40 - t * 1.21 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
