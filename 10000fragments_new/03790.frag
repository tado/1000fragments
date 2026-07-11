uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.29 + sr * 16.74 - t * 1.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -1.02) * p;
	p = (floor(p * 6.5) + 0.5) / 6.5;
	{ p = vec2(atan(p.y, p.x) * 1.09, length(p) * 2.74 - time * 0.40); }
	p = fract(p * 2.91) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.54, 0.43, 0.56) * (0.25 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
