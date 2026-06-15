uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 23.50 + sin(p.y * 2.57 + t * 3.65) * 1.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	p = rot2(time * -0.57) * p;
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	p = rot2(length(p) * 1.29 + time * 1.10) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.32; p = rot2(2.00) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.71));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
