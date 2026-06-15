uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.00 + sin(p.y * 4.03 + t * 3.74) * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	p = abs(p) - 0.37;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.30; p = rot2(2.53) * p; }
	p = rot2(p.y * -2.45 + time * 1.00) * p;
	p = rot2(length(p) * -2.45 + time * 1.05) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.52));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
