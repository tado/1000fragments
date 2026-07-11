uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.29 + sr * 9.97 - t * 2.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	p = (floor(p * 12.3) + 0.5) / 12.3;
	p = rot2(1.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.64, 0.78, 0.34) * (0.14 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
