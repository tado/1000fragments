uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.65, t * 1.17 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.95;
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 3.85 - time * 0.19); }
	p = abs(p);
	p = rot2(time * 1.11) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.08, 0.48), vec3(0.62, 0.66, 0.45), d);
	col = mod(col * 2.17, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
