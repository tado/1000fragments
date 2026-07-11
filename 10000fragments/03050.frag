uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.17 + vec2(t * 0.72, -t * 0.72) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.08, length(p) * 4.25 - time * 0.75); }
	p = rot2(1.72) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.23, 0.27, 0.59), vec3(0.81, 0.81, 0.45), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
