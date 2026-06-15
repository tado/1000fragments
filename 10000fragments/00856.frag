uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.08 + sin(p.y * 2.59 + t * 3.23) * 4.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	p = rot2(0.39) * p;
	p *= 2.23;
	p = rot2(length(p) * 2.80 + time * 0.26) * p;
	p += vec2(0.44, 0.06) * sin(length(p) * 4.93 - time * 1.23) * 0.17;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.01 + time * 0.10);
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
