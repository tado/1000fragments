uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.00 - t * 8.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.81;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.81; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(0.66) * p; }
	p.y += sin(p.x * 3.50 + time * 3.91) * 0.12;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.54), field(p, time, 1.08));
	col = 0.5 + 0.5 * col;
	col *= 0.81 + 0.16 * sin(gl_FragCoord.y * 0.81 + time * 15.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
