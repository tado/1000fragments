uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.67 + sin(p.y * 5.71 + t * 1.48) * 3.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	p = rot2(length(p) * 1.24 + time * 0.63) * p;
	p = rot2(time * 0.99) * p;
	p *= 1.58;
	p += vec2(0.24, 0.37) * sin(length(p) * 2.08 - time * 1.79) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.67 + time * 0.09, vec3(0.48, 0.50, 0.57), vec3(0.38, 0.39, 0.40), vec3(0.83, 1.20, 0.87), vec3(0.47, 0.29, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
