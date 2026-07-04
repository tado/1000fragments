uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 15.65);
    float gsh = hash21(vec2(grow, floor(t * 8.70))) - 0.5;
    float gx = p.x + gsh * 0.88;
    v = sin(gx * 13.39 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.20));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 1.98 + time * 1.48) * p;
	p = sin(p * 2.02 + time * 1.48) * 1.18;
	p = abs(p) - 0.57;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.98, 1.27, 0.76) + vec3(0.10, 0.25, 0.12);
	col = clamp((col - 0.5) * 1.59 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
