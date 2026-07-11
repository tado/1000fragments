uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.51 + t * 3.87 + ph) + sin(p.y * 8.95 - t * 3.87 + ph)
        + sin((p.x + p.y) * 2.34 + t * 3.87 + ph) + sin(length(p) * 6.17 - t * 3.87 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(length(p) * 2.76 + time * 1.36) * p;
	p = rot2(1.18) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.58));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
