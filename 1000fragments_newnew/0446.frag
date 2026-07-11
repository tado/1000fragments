uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.11, t * 0.70 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	p.y += sin(p.x * 4.92 + (time * 0.75) * 1.81) * 0.25;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.48; }
	p = fract(p * 1.62) - 0.5;
	float d = field(p, (time * 0.75), 0.0);
	vec3 col = palette(d * 0.58 + (time * 0.75) * 0.04, vec3(0.33, 0.34, 0.39), vec3(0.13, 0.19, 0.18), vec3(0.61, 0.54, 0.59), vec3(0.48, 0.20, 0.27));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.75)) * 100.0) - 0.5) * 0.08;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.004, 0.949) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
