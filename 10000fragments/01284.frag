uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.97 + t * 2.32 + ph) + sin(p.y * 3.29 - t * 2.32 + ph)
        + sin((p.x + p.y) * 6.63 + t * 2.32 + ph) + sin(length(p) * 6.24 - t * 2.32 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 1.22) * p;
	p *= 1.76;
	p = abs(p) - 0.58;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.01), field(p, time, 2.02));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
