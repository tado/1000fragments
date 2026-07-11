uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.43 + 0.12 * cos(sa * 5 + t * 1.47 + ph);
    v = sin((sr - petal) * 14.72);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.59; p = rot2(1.67) * p; }
	p = abs(p) - 0.58;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.05 + time * 0.03, vec3(0.52, 0.58, 0.57), vec3(0.32, 0.46, 0.39), vec3(1.30, 1.35, 0.96), vec3(0.41, 0.14, 0.57));
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
