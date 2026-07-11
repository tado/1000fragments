uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.06 + sin(p.y * 5.70 + t * 5.92) * 2.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -3.15 + time * 0.32) * p;
	{ p = vec2(atan(p.y, p.x) * 2.57, length(p) * 4.74 - time * 0.34); }
	p = fract(p * 2.67) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.48, 0.23, 0.45) * (0.17 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
