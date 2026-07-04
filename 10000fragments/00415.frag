uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.34 + 0.17 * cos(sa * 5.0 + t * 0.74 + ph);
    v = sin((sr - petal) * 8.95);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(0.65) * p;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.06;
	p = rot2(length(p) * 1.94 + time * 1.05) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.89, 0.85, 0.71) * (0.21 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
