uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.19 * cos(sa * 3.0 + t * 1.75 + ph);
    v = sin((sr - petal) * 9.23);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = rot2(p.y * 3.75 + time * 0.65) * p;
	p.x += sin(p.y * 7.33 + time * 2.98) * 0.31;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.14, 0.20), vec3(0.59, 0.50, 0.48), d);
	col = clamp((col - 0.5) * 1.43 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
