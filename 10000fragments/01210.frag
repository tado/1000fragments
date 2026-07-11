uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.66 + t * 2.27 + ph) + sin(p.y * 11.03 - t * 2.27 + ph)
        + sin((p.x + p.y) * 10.80 + t * 2.27 + ph) + sin(length(p) * 10.41 - t * 2.27 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	p = fract(p * 1.14) - 0.5;
	p = rot2(time * 0.34) * p;
	p = rot2(2.26) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.28), field(p, time, 2.56));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
