uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.15 + t * 2.66 + ph) + sin(p.y * 9.90 - t * 4.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.30;
	p = rot2(p.y * -3.95 + time * 0.89) * p;
	{ p = vec2(atan(p.y, p.x) * 1.62, length(p) * 4.51 - time * 0.67); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.67));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
