uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.00 + t * 2.28 + ph) + sin(p.y * 4.86 - t * 4.45 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 2.51, length(p) * 2.35 - time * 0.44); }
	p = abs(p);
	p += vec2(-0.16, -0.64) * sin(length(p) * 3.42 - time * 1.11) * 0.35;
	p = rot2(length(p) * 1.39 + time * 0.59) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.31, 0.15, 0.09), vec3(0.90, 0.91, 0.56), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
