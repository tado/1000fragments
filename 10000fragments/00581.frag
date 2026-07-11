uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.05 + sin(p.y * 1.91 + t * 3.04) * 4.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.77;
	p = rot2(2.28) * p;
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.52; p = rot2(1.34) * p; }
	p = rot2(length(p) * -3.24 + time * 1.15) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.49), field(p, time, 0.99));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
