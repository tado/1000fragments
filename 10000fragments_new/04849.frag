uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.68 + sr * 23.59 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.27;
	p = rot2(p.y * 3.29 + time * 1.08) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.82) * p;
	p.x += sin(p.y * 5.63 + time * 3.57) * 0.40;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.03, 0.24, 0.02), vec3(0.58, 0.66, 0.64), d);
	col *= 0.85 + 0.19 * sin(gl_FragCoord.y * 2.80 + time * 7.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
