uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.75 + sin(p.y * 5.76 + t * 2.01) * 1.60 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.45;
	{ p = vec2(atan(p.y, p.x) * 3.00, length(p) * 3.90 - time * 0.22); }
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	p = rot2(1.30) * p;
	p = rot2(time * 0.91) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.40, 0.29), vec3(0.99, 0.68, 0.90), d);
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
