uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.19, t * 1.72 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.33;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.95 + (time * 0.92) * 1.41) * p;
	p.x += sin(p.y * 6.08 + (time * 0.92) * 2.48) * 0.35;
	p = fract(p * 2.70) - 0.5;
	float d = field(p, (time * 0.92), 0.0);
	vec3 col = vec3(0.181, 0.246, 0.448) * (0.11 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.58 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.964, 1.013, 0.947);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
