uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.21 + t * 1.64 + ph) + sin(p.y * 13.90 - t * 1.64 + ph)
        + sin((p.x + p.y) * 8.37 + t * 1.64 + ph) + sin(length(p) * 8.53 - t * 1.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.22;
	p.y += sin(p.x * 5.62 + time * 1.93) * 0.14;
	p = rot2(3.05) * p;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.41, length(p) * 2.57 - time * 0.38); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.80));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
