uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.08 + t * 0.73 + ph) + sin(p.y * 10.32 - t * 3.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.43;
	{ float fr = length(p); p *= 1.0 + -0.22 * fr * fr; }
	p = rot2(time * 0.48) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(1.32) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.36));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
