uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.41 + sin(p.y * 1.69 + t * 4.92) * 4.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.96;
	p = fract(p * 2.41) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.77, length(p) * 4.35 - time * 0.52); }
	p *= 1.51;
	p = rot2(2.24) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.33, 0.35, 0.34), vec3(0.64, 0.53, 0.69), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
