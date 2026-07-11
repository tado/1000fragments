uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.48) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 2.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.02, lr * 2.52 + time * 0.92); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.06, length(p) * 5.73 - time * 0.30); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
