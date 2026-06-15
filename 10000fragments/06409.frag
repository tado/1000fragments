uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.14, t * 2.23 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.87) - 0.5;
	p = rot2(length(p) * -2.92 + time * 0.92) * p;
	p += vec2(-0.91, -0.85) * sin(length(p) * 2.77 - time * 1.39) * 0.32;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.63), field(p, time, 1.25));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
