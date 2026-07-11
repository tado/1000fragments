uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.36, t * 0.97 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p = rot2(time * -0.95) * p;
	p += vec2(-0.31, 0.26) * sin(length(p) * 5.85 - time * 1.72) * 0.33;
	p.y += sin(p.x * 6.37 + time * 1.37) * 0.11;
	p *= 1.31;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.80));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
