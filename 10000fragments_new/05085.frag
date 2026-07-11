uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.58);
    float gsh = hash21(vec2(grow, floor(t * 8.60))) - 0.5;
    float gx = p.x + gsh * 0.92;
    v = sin(gx * 8.58 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.33));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	{ p = vec2(atan(p.y, p.x) * 2.47, length(p) * 5.51 - time * 0.53); }
	p = rot2(length(p) * 1.64 + time * 1.04) * p;
	p = rot2(p.y * -3.03 + time * 0.39) * p;
	p = rot2(1.39) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.78, 1.16, 0.73) + vec3(0.12, 0.06, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
