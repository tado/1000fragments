uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.60 + sr * 15.20 - t * 4.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	{ p = vec2(atan(p.y, p.x) * 2.62, length(p) * 5.70 - time * 0.29); }
	p *= 2.56;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.35; p = rot2(1.60) * p; }
	{ float fr = length(p); p *= 1.0 + -0.24 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.01, 0.15), vec3(0.85, 0.62, 0.40), d);
	col = fract(col * 1.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
