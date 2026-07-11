uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.92 + sr * 20.34 - t * 1.90 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	p = rot2(length(p) * -3.13 + time * 0.42) * p;
	p *= 3.16;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.42, 0.88, 1.36) + vec3(0.04, 0.24, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
