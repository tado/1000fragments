uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.24 * cos(sa * 5 + t * 1.63 + ph);
    v = sin((sr - petal) * 12.94);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	p = rot2(length(p) * 3.14 + time * 1.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 1.33, 1.38) + vec3(0.01, 0.19, 0.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
