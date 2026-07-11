uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 19.61 + t * 3.63 + ph) * 0.7;
    float wb = sin(p.y * 8.98 - t * 3.87 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.54;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.26; p = rot2(1.35) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.66, length(p) * 3.38 - time * 0.31); }
	p = fract(p * 2.15) - 0.5;
	p += vec2(-0.55, -0.01) * sin(length(p) * 5.64 - time * 2.19) * 0.22;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.19), field(p, time, 2.38));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
