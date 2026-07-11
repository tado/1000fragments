uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.80 + t * 0.77 + ph) + sin(p.y * 9.49 - t * 0.77 + ph)
        + sin((p.x + p.y) * 10.47 + t * 0.77 + ph) + sin(length(p) * 12.05 - t * 0.77 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.31, length(p) * 5.46 - time * 0.24); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(0.89) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.26));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
