uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.55, t * 1.83 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.46));
	p = rot2(length(p) * 2.25 + time * 1.15) * p;
	p = sin(p * 2.72 + time * 1.46) * 1.30;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.93, 0.90, 0.59) * (0.13 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
