uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.30;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.42; kp = rot2(1.96) * kp; kp *= 1.32; }
    v = sin(kp.x * 2.70 - t * 1.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 22.0) + 0.5) / 22.0;
	{ p = vec2(atan(p.y, p.x) * 1.06, length(p) * 2.77 - time * 1.00); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.50));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
