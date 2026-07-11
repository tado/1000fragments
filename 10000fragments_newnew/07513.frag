uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.20 * cos(sa * 7.0 + t * 1.90 + ph);
    v = sin((sr - petal) * 13.77);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	p = rot2(p.y * -2.28 + time * 0.86) * p;
	p = fract(p * 1.85) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.25, 0.41, 0.30), vec3(0.95, 0.62, 0.82), d);
	col = mod(col * 1.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
