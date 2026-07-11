uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.57 + sin(p.y * 4.58 + t * 2.08) * 1.45 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.22;
	p = rot2(p.y * -1.26 + time * 0.73) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.41; p = rot2(1.56) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.77));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
