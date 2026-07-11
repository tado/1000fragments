uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.31 + vec2(t * 2.50, -t * 2.51) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.28;
    v = 0.5 * (sin(6.0 * cp.x + t * 2.56) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 1.99) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.48; p = rot2(0.44) * p; }
	p = rot2(p.y * -1.43 + (time * 0.76) * 0.73) * p;
	float d1 = field(p, (time * 0.76), 0.0);
	float d2 = field2(p, (time * 0.76), 0.68);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.98 + (time * 0.76) * 0.00, vec3(0.50, 0.45, 0.48), vec3(0.10, 0.12, 0.18), vec3(0.63, 0.66, 0.56), vec3(0.52, 0.52, 0.76));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.963, 1.009) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
