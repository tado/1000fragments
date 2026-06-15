uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.74 + sin(p.y * 2.64 + t * 1.20) * 3.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	p = rot2(p.y * -2.49 + time * 0.43) * p;
	p *= 3.05;
	{ p = vec2(atan(p.y, p.x) * 2.73, length(p) * 4.92 - time * 0.71); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.38, 0.10), vec3(0.68, 0.55, 0.97), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
