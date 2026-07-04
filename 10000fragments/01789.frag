uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.59, t * 0.61 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.81;
	p = rot2(length(p) * 3.50 + time * 1.13) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.79, 0.39, 0.43) * (0.12 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
