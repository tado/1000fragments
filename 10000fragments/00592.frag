uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.01 + sin(p.y * 5.66 + t * 0.66) * 4.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.58; p = rot2(1.26) * p; }
	p = rot2(time * 1.19) * p;
	p = rot2(length(p) * 2.23 + time * 0.20) * p;
	p *= 1.58;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.88));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
