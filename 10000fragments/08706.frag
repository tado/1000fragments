uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.84 + sr * 17.87 - t * 3.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.68;
	p += vec2(0.32, 0.75) * sin(length(p) * 4.01 - time * 0.68) * 0.38;
	p = rot2(time * 0.35) * p;
	p = rot2(length(p) * 3.79 + time * 0.70) * p;
	p = fract(p * 1.19) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.51, 0.92, 1.53) + vec3(0.29, 0.06, 0.01);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
