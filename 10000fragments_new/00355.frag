uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.25 + sr * 23.20 - t * 4.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 0.75) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(1.18) * p; }
	p = rot2(length(p) * -2.47 + time * 1.01) * p;
	{ p = vec2(atan(p.y, p.x) * 1.46, length(p) * 4.51 - time * 0.39); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.61, 0.94, 1.21) + vec3(0.21, 0.18, 0.10);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.39 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
