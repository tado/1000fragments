uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.59;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.78; kp = rot2(1.76) * kp; kp *= 1.29; }
    v = sin(kp.x * 1.54 - t * 2.66 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.58;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.83));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
