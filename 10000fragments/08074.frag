uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.00 + t * 0.95 + ph) + sin(p.y * 5.36 - t * 0.95 + ph)
        + sin((p.x + p.y) * 9.03 + t * 0.95 + ph) + sin(length(p) * 10.95 - t * 0.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.27;
	p = abs(p) - 0.49;
	p *= 1.27;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.69));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
