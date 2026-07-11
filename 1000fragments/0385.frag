uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.90 + sr * 5.53 - t * 0.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(0.78, 0.05) * sin(length(p) * 4.98 - time * 1.25) * 0.23;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.04), field(p, time, 2.07));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
