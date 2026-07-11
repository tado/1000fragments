uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.19 - t * 7.52 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = fract(p * 1.80) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.20 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.16));
	col = 0.5 + 0.5 * col;
	col *= 0.80 + 0.16 * sin(gl_FragCoord.y * 2.28 + time * 17.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
