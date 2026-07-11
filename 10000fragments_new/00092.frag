uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.63;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.55; kp = rot2(1.45) * kp; kp *= 1.17; }
    v = sin(kp.x * 1.89 - t * 1.38 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	p.x += sin(p.y * 2.27 + time * 3.44) * 0.13;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.31, 0.26, 0.52) * (0.22 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
