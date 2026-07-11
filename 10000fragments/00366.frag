uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.69 + t * 2.91 + ph) + sin(p.y * 6.59 - t * 0.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.79) - 0.5;
	p = rot2(length(p) * -2.21 + time * 0.51) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.49));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
