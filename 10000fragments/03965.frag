uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.27 * cos(sa * 3 + t * 1.41 + ph);
    v = sin((sr - petal) * 14.17);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2(time * -0.44) * p;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 3.34 - time * 0.59); }
	p = rot2(length(p) * -3.79 + time * 0.58) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.12, 0.16), vec3(0.58, 0.78, 0.62), d);
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
