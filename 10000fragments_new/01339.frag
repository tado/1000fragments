uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.26;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.56; kp = rot2(1.16) * kp; kp *= 1.23; }
    v = sin(kp.x * 3.44 - t * 4.15 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.90;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.16, 0.26, 0.40) * (0.24 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
