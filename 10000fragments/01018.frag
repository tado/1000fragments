uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.91 + t * 2.09 + ph) + sin(p.y * 9.10 - t * 2.09 + ph)
        + sin((p.x + p.y) * 3.50 + t * 2.09 + ph) + sin(length(p) * 6.56 - t * 2.09 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.29; p = rot2(0.56) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.15, length(p) * 2.87 - time * 0.29); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.98 + time * 0.14, vec3(0.55, 0.40, 0.50), vec3(0.33, 0.42, 0.46), vec3(1.01, 1.04, 1.13), vec3(0.27, 0.01, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
