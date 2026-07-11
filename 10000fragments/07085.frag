uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.09, t * 1.21 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	p = rot2(length(p) * 3.32 + time * 0.31) * p;
	p += vec2(0.37, 0.91) * sin(length(p) * 3.36 - time * 0.88) * 0.16;
	{ float fr = length(p); p *= 1.0 + -0.69 * fr * fr; }
	p = fract(p * 1.51) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.02 + time * 0.14);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
