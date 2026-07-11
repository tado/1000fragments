uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.36 + 0.19 * cos(sa * 6.0 + t * 2.74 + ph);
    v = sin((sr - petal) * 14.55);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	p = rot2(p.y * 1.53 + time * 0.99) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.12, 0.01), vec3(0.66, 0.55, 0.41), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
