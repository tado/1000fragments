uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 9.27 - t * 6.13 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 39.46 - t * 5.62 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	p = abs(p);
	p = fract(p * 1.69) - 0.5;
	p *= 1.0 + 0.37 * sin(time * 4.43);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.74));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
