uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.22 * cos(sa * 5.0 + t * 1.69 + ph);
    v = sin((sr - petal) * 13.37);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.00;
	p = fract(p * 1.52) - 0.5;
	p = rot2(1.70) * p;
	p = (floor(p * 14.5) + 0.5) / 14.5;
	{ p = vec2(atan(p.y, p.x) * 2.67, length(p) * 2.58 - time * 0.86); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.62, 0.97, 0.40) * (0.21 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
