uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 38.37 - t * 4.46 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 17.66 - t * 4.46 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.33;
	p += vec2(-0.93, -0.13) * sin(length(p) * 4.33 - time * 1.29) * 0.30;
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 3.46 - time * 0.42); }
	{ float fr = length(p); p *= 1.0 + 0.62 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.51));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
