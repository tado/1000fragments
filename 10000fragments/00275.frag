uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.45 + 0.29 * cos(sa * 7 + t * 1.48 + ph);
    v = sin((sr - petal) * 16.65);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	p += vec2(-0.24, 0.54) * sin(length(p) * 3.93 - time * 0.72) * 0.35;
	p = rot2(length(p) * -3.30 + time * 1.07) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.39, 0.63, 0.95) + vec3(0.03, 0.27, 0.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
