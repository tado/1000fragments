uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.12);
    float gsh = hash21(vec2(grow, floor(t * 4.34))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 12.94 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.08));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.60; p = rot2(1.33) * p; }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.92; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.01, 1.28, 1.14) + vec3(0.25, 0.11, 0.15);
	col = fract(col * 1.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
