uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.54, t * 0.87 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.05) * p;
	p = fract(p * 1.30) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.44 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.77 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
