uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 2.02;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.65; kp = rot2(1.24) * kp; kp *= 1.42; }
    v = sin(kp.y * 2.65 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.64) - 0.5;
	p = rot2(0.76) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.93, 0.18, 0.97) * (0.14 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
