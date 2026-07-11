uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.29 * cos(sa * 9 + t * 0.31 + ph);
    v = sin((sr - petal) * 13.28);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -3.11 + time * 0.90) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.42; p = rot2(0.98) * p; }
	p += vec2(0.73, 0.86) * sin(length(p) * 4.64 - time * 0.62) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.06));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
