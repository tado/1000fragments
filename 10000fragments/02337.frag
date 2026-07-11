uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.19 * cos(sa * 6 + t * 2.79 + ph);
    v = sin((sr - petal) * 17.82);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.48; p = rot2(1.14) * p; }
	p *= 3.44;
	{ p = vec2(atan(p.y, p.x) * 2.15, length(p) * 2.26 - time * 0.68); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.63));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
