uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.20 + sin(p.y * 1.12 + t * 3.90) * 4.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	{ p = vec2(atan(p.y, p.x) * 2.06, length(p) * 5.74 - time * 0.67); }
	p = fract(p * 1.25) - 0.5;
	p = rot2(length(p) * -2.45 + time * 0.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.96, 0.53, 1.60) + vec3(0.23, 0.14, 0.03);
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
