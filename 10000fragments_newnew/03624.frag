uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.69 + t * 1.47) - 0.5) * 2.0;
    v = sin((p.y * 7.58 + zx * 1.95 + t * 2.45) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.18));
	p = rot2(length(p) * -1.26 + time * 0.94) * p;
	{ float fr = length(p); p *= 1.0 + -0.62 * fr * fr; }
	p = rot2(time * 1.35) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.27, 0.22, 0.09), vec3(0.55, 0.61, 0.73), d);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 2.89 + time * 16.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
