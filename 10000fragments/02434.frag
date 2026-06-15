uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.47 + 0.29 * cos(sa * 5 + t * 2.45 + ph);
    v = sin((sr - petal) * 9.56);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(0.67) * p; }
	p = rot2(p.y * 2.22 + time * 0.99) * p;
	p = rot2(length(p) * 2.26 + time * 0.40) * p;
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 4.60 - time * 0.27); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.15, 0.27), vec3(0.91, 0.72, 0.99), d);
	col = mod(col * 2.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
