uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.20 * cos(sa * 9 + t * 1.05 + ph);
    v = sin((sr - petal) * 7.82);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(1.96) * p; }
	p = rot2(2.98) * p;
	p = fract(p * 2.67) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 2.06, length(p) * 5.25 - time * 0.13); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.09, 0.33, 0.12), vec3(0.81, 0.78, 0.90), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
