uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.03 + sin(p.y * 5.14 + t * 5.92) * 1.74 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 3.00, length(p) * 5.64 - time * 0.52); }
	p = fract(p * 1.17) - 0.5;
	p = rot2(length(p) * -2.46 + time * 0.61) * p;
	p += vec2(-0.71, 0.84) * sin(length(p) * 3.14 - time * 1.99) * 0.17;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.70));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
