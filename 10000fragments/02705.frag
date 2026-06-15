uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.99 - t * 6.81 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.35 * fr * fr; }
	p = rot2(length(p) * -1.60 + time * 0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.21, vec3(0.45, 0.55, 0.45), vec3(0.42, 0.34, 0.42), vec3(1.26, 1.26, 1.40), vec3(0.19, 0.32, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
