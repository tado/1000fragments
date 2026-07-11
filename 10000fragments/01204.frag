uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.19 + t * 0.53 + ph) + sin(p.y * 9.76 - t * 0.53 + ph)
        + sin((p.x + p.y) * 2.94 + t * 0.53 + ph) + sin(length(p) * 7.97 - t * 0.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.38; p = rot2(0.97) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.24, vec3(0.59, 0.53, 0.49), vec3(0.48, 0.45, 0.32), vec3(0.94, 1.38, 0.79), vec3(0.47, 0.61, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
