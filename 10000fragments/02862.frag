uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.30 + vec2(t * 0.74, -t * 0.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.32; p = rot2(0.39) * p; }
	{ float fr = length(p); p *= 1.0 + -0.76 * fr * fr; }
	p += vec2(-0.21, 0.28) * sin(length(p) * 5.07 - time * 1.03) * 0.13;
	{ p = vec2(atan(p.y, p.x) * 1.67, length(p) * 2.52 - time * 0.79); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.29), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
