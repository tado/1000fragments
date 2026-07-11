uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.12;
    float pk = 6.2831853 / 7.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 9.54 - t * 2.25 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.0 + 0.30 * sin(time * 2.53);
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.78));
	col = 0.5 + 0.5 * col;
	col *= 0.84 + 0.13 * sin(gl_FragCoord.y * 2.57 + time * 12.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
