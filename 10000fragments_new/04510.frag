uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.60 + sin(p.y * 4.57 + t * 4.38) * 3.41 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = (floor(p * 23.7) + 0.5) / 23.7;
	p *= 1.95;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.49, lr * 2.85 + time * -0.35); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
