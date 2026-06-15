uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.23 + t * 2.02 + ph) + sin(p.y * 17.39 - t * 4.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 5.30 - time * 0.75); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(time * -0.45) * p;
	p = fract(p * 1.38) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.00), field(p, time, 2.01));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
