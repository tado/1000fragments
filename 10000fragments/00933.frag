uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.23 + t * 1.00 + ph) + sin(p.y * 10.36 - t * 1.00 + ph)
        + sin((p.x + p.y) * 8.09 + t * 1.00 + ph) + sin(length(p) * 10.35 - t * 1.00 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	p = fract(p * 1.53) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.33, length(p) * 4.97 - time * 0.28); }
	p *= 1.59;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
