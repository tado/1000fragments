uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.55 + t * 1.18 + ph) + sin(p.y * 4.76 - t * 1.18 + ph)
        + sin((p.x + p.y) * 6.41 + t * 1.18 + ph) + sin(length(p) * 11.26 - t * 1.18 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	p = rot2(length(p) * 3.76 + time * 1.17) * p;
	p = abs(p) - 0.53;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 2.61 - time * 0.31); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.43));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
