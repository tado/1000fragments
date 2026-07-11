uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.08 + t * 3.08 + ph) + sin(p.y * 3.97 - t * 3.08 + ph)
        + sin((p.x + p.y) * 10.07 + t * 3.08 + ph) + sin(length(p) * 8.63 - t * 3.08 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	p = fract(p * 2.19) - 0.5;
	p *= 1.23;
	p = rot2(length(p) * -3.83 + time * 0.95) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.33));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.71 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
