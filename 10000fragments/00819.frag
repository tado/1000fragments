uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.18 + sin(p.y * 3.94 + t * 4.40) * 4.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(1.77) * p; }
	p = abs(p);
	p = rot2(time * 0.89) * p;
	p = rot2(2.62) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.69));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
