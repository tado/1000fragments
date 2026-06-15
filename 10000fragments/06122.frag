uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.77 + t * 4.11 + ph) + sin(p.y * 7.16 - t * 1.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 1.54 + time * 0.96) * p;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	p *= 1.73;
	p = fract(p * 1.63) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.80));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.56, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
