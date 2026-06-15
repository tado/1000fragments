uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.28 * cos(sa * 6 + t * 1.19 + ph);
    v = sin((sr - petal) * 13.23);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	p = rot2(0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.59, 0.68, 0.81) + vec3(0.29, 0.25, 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
