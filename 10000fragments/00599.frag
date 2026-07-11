uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.11 + sin(p.y * 1.62 + t * 2.87) * 2.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	{ p = vec2(atan(p.y, p.x) * 1.32, length(p) * 2.63 - time * 0.43); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.14; p = rot2(1.39) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.78));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
