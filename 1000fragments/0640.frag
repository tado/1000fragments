uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.00 + sin(p.y * 5.27 + t * 0.94) * 4.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	p = fract(p * 2.59) - 0.5;
	p = rot2(length(p) * 1.88 + time * 0.73) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.71));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
