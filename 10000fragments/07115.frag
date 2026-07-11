uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.05, t * 1.15 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ p = vec2(atan(p.y, p.x) * 1.59, length(p) * 5.01 - time * 0.45); }
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	p += vec2(-0.70, -0.94) * sin(length(p) * 2.27 - time * 1.94) * 0.26;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.44, 0.00, 0.45), vec3(0.74, 0.93, 0.93), d);
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
