uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.22 * cos(sa * 4.0 + t * 2.26 + ph);
    v = sin((sr - petal) * 18.72);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p = abs(p);
	p = rot2(p.y * 3.28 + time * 0.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.04, 0.58, 0.77) + vec3(0.07, 0.15, 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
