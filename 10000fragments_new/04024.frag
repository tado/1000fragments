uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.65 + 0.23 * cos(sa * 6.0 + t * 1.11 + ph);
    v = sin((sr - petal) * 8.66);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += sin(p.y * 6.91 + time * 2.07) * 0.28;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.31), field(p, time, 2.61));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
