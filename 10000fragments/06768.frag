uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.12, t * 0.74 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.79;
	p = fract(p * 1.37) - 0.5;
	p = abs(p);
	p = rot2(time * -0.29) * p;
	p = rot2(2.15) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.45), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
