uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.05 + t * 0.78 + ph) + sin(p.y * 6.04 - t * 0.78 + ph)
        + sin((p.x + p.y) * 2.91 + t * 0.78 + ph) + sin(length(p) * 10.73 - t * 0.78 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	{ p = vec2(atan(p.y, p.x) * 2.06, length(p) * 2.03 - time * 0.51); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.18; p = rot2(0.98) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.75 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
