uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.41 + t * 4.57 + ph) + sin(p.y * 17.75 - t * 5.94 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.37; p = rot2(0.92) * p; }
	{ p = vec2(atan(p.y, p.x) * 1.66, length(p) * 4.11 - time * 0.12); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.91 + time * 0.25, vec3(0.48, 0.41, 0.40), vec3(0.46, 0.41, 0.37), vec3(1.27, 1.40, 0.91), vec3(0.02, 0.64, 0.19));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
