uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.32;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.48; kp = rot2(1.00) * kp; kp *= 1.38; }
    v = sin(kp.x * 3.83 - t * 3.76 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 21.4) + 0.5) / 21.4;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.66));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
