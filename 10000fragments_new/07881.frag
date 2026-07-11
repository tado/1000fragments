uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.88 + t * 3.19 + ph) + sin(p.y * 4.56 - t * 3.19 + ph)
        + sin((p.x + p.y) * 10.72 + t * 3.19 + ph) + sin(length(p) * 6.23 - t * 3.19 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.40; p = rot2(1.38) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.65, length(p) * 3.62 - time * 0.31); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.65), field(p, time, 1.29));
	col = 0.5 + 0.5 * col;
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 2.99 + time * 13.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
