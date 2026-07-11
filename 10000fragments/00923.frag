uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.19 + t * 4.92 + ph) + sin(p.y * 7.23 - t * 4.92 + ph)
        + sin((p.x + p.y) * 11.92 + t * 4.92 + ph) + sin(length(p) * 7.46 - t * 4.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	{ p = vec2(atan(p.y, p.x) * 1.89, length(p) * 5.96 - time * 0.43); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * -1.55 + time * 0.12) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.26), field(p, time, 2.52));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
