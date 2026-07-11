uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.29 + t * 3.57 + ph) + sin(p.y * 10.03 - t * 3.57 + ph)
        + sin((p.x + p.y) * 3.67 + t * 3.57 + ph) + sin(length(p) * 14.32 - t * 3.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.35;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * 1.18) * p;
	p = (floor(p * 21.3) + 0.5) / 21.3;
	p.x += sin(p.y * 7.41 + time * 2.98) * 0.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.17), field(p, time, 2.35));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
