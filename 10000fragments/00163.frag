uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.58 + sin(p.y * 2.28 + t * 2.78) * 2.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.31; p = rot2(1.10) * p; }
	p += vec2(-0.47, -0.60) * sin(length(p) * 5.69 - time * 0.55) * 0.13;
	p *= 1.93;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.90), field(p, time, 1.80));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
