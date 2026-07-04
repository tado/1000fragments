uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 24.35 - t * 5.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.x += sin(p.y * 2.45 + time * 1.50) * 0.15;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.94;
	{ p = vec2(atan(p.y, p.x) * 1.51, length(p) * 3.79 - time * 0.44); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.98));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
