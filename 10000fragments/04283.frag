uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 13.54 - t * 7.13 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 37.06 - t * 7.13 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.66), field(p, time, 1.31));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
