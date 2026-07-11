uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.70;
    for(int ki = 0; ki < 3; ki++){ kp = abs(kp) - 0.47; kp = rot2(1.67) * kp; kp *= 1.22; }
    v = sin(kp.y * 3.17 - t * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	p = rot2(time * 1.01) * p;
	p = abs(p) - 0.32;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.98));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
