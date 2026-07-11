uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.39);
    float gsh = hash21(vec2(grow, floor(t * 4.68))) - 0.5;
    float gx = p.x + gsh * 0.50;
    v = sin(gx * 16.69 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.02));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	p *= 3.16;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.12; p = rot2(0.67) * p; }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 5.65 - time * 0.24); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.93, 0.74, 0.88) + vec3(0.24, 0.11, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
