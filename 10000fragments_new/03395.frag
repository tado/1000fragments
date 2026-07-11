uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.30 * pow(abs(cos(ra * 3.0 + t * 0.68)), 0.75);
    v = sin((rr - pet) * 20.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.88) - 0.5;
	p *= 2.51;
	{ float fr = length(p); p *= 1.0 + 0.21 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.29; p = rot2(0.45) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.29));
	col = 0.5 + 0.5 * col;
	col *= 0.81 + 0.13 * sin(gl_FragCoord.y * 1.05 + time * 11.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
