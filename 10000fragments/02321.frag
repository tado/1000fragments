uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.27 * cos(sa * 9 + t * 2.07 + ph);
    v = sin((sr - petal) * 8.38);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.70 + time * 0.79) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.80, 1.41, 0.93) + vec3(0.22, 0.24, 0.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
