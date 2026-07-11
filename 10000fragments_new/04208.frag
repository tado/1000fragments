uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.20 * cos(sa * 9.0 + t * 2.11 + ph);
    v = sin((sr - petal) * 16.16);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.67;
	p = rot2(2.47) * p;
	p += vec2(-0.80, 0.95) * sin(length(p) * 3.29 - time * 2.24) * 0.14;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 1.05 + time * 15.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
